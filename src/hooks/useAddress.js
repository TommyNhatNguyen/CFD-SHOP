import { useState } from "react";
import useQuery from "./useQuery";
import { provinceService } from "../services/provinceService";
import { districtService } from "../services/districtService";
import { wardService } from "../services/wardService";

function useAddress(defaultValue) {
  const [provinceId, setProvinceId] = useState(defaultValue?.provinceId);
  const [districtId, setDistrictId] = useState(defaultValue?.districtId);
  const [wardId, setWardId] = useState(defaultValue?.wardId);

  const { data: provinceData } = useQuery(provinceService.getProvinces);

  const { data: districtData } = useQuery(
    () => provinceId && districtService.getDistricts(provinceId),
    [provinceId]
  );

  const { data: wardData } = useQuery(
    () => districtId && wardService.getWard(districtId),
    [districtId]
  );

  const handleProvinceChange = (changedId) => {
    setProvinceId(changedId);
    setDistrictId(undefined);
    setWardId(undefined);
  };

  const handleDistrictChange = (changedId) => {
    setDistrictId(changedId);
    setWardId(undefined);
  };

  const handleWardChange = (changedId) => {
    setWardId(changedId);
  };

  return {
    provinces: provinceData?.provinces?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    }),
    districts: districtData?.districts?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    }),
    wards: wardData?.wards?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    }),
    wardId,
    provinceId,
    districtId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  };
}
export default useAddress;
