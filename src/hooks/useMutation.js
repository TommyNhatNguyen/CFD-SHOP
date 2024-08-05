import { useState } from "react";

function useMutation(promise) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  async function execute(payload, options = {}) {
    setLoading(true);
    try {
      const res = await promise(payload);
      if (res?.data?.data) {
        setData(res?.data?.data);
        options?.onSuccess();
      }
    } catch (error) {
      setError(error);
      options?.onFail();
    } finally {
      setLoading(false);
    }
  }
  return { data, loading, error, execute };
}
export default useMutation;
