import { useEffect, useState } from "react";

function useMedia(conditionWidth: number) {
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    function handleResize() {
      const viewportWidth = window.innerWidth;
      setIsTrue(viewportWidth >= conditionWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [conditionWidth]);

  return isTrue;
}

export default useMedia;
