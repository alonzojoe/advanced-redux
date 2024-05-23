import { useRef, useEffect } from "react";
const useDidMount = () => {
  const mountedRef = useRef(true);

  useEffect(() => (mountedRef.current = false), []);

  return mountedRef.current;
};

export default useDidMount;
