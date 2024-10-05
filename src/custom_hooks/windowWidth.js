import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  // State to store the window size
  const [windowWidth, setWindowWidth] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowWidth({
        width: window.innerWidth,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowWidth;
};
