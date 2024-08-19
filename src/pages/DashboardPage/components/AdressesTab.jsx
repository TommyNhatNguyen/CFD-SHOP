import React from "react";
import { NavLink } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";
import { provinceService } from "../../../services/provinceService";
import { districtService } from "../../../services/districtService";
import { wardService } from "../../../services/wardService";

const AdressesTab = () => {
  const { profile } = useSelector((state) => state.auth);
  const { firstName, phone, email, street, province, ward, district } = profile;
  const { data: provinceData } =
    useQuery(() =>
      province
        ? provinceService.getProvincesById(`/${province}`)
        : provinceService.getProvinces
    ) || [];
  const { data: districtData } =
    useQuery(() =>
      district
        ? districtService.getDistrictsById(`/${district}`)
        : districtService.getDistricts
    ) || [];
  const { data: wardData } =
    useQuery(() =>
      ward ? wardService.getWardById(`/${ward}`) : wardService.getWard
    ) || [];

  const provinceName = provinceData?.name || "";
  const districtName = districtData?.name || "";
  const wardName = wardData?.name || "";
  return (
    <div
      className="tab-pane fade show active"
      id="tab-address"
      role="tabpanel"
      aria-labelledby="tab-address-link"
    >
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong>Fullname:</strong> {firstName || ""} <br />
                <strong>Email:</strong> {email || ""} <br />
                <strong>Phone number:</strong> {phone || "0909284493"} <br />
                <br />
                <NavLink end to={PATHS.DASHBOARD.DETAIL}>
                  Edit <i className="icon-edit" />
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                <strong>Address: </strong>{" "}
                {street && wardName && districtName && provinceName
                  ? `${street}, ${wardName}, ${districtName}, ${provinceName}`
                  : ""}
                <br />
                <strong>Province: </strong> {provinceName || ""} <br />
                <strong>District: </strong> {districtName || ""} <br />
                <strong>Ward: </strong> {wardName || ""} <br />
                <br />
                <NavLink end to={PATHS.DASHBOARD.DETAIL}>
                  Edit <i className="icon-edit" />
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdressesTab;
