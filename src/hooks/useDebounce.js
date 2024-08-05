import { useEffect, useState } from "react";

function useDebounce(changedValue, delay) {
  const [debouncedValue, setDebouncedValue] = useState(changedValue);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(changedValue);
    }, delay);
    return () => clearTimeout(timeId);
  }, [changedValue]);
  return debouncedValue;
}
export default useDebounce;
