import { useState, useEffect } from 'react';


const useWindowsHeight = () => {

  const [height, setHeight] = useState({
    viewHeight: undefined,
    documentHeight: undefined
  });

  // Handler to call on window resize
  const handleResize = () => {
    setHeight({
      viewHeight: window.innerHeight,
      documentHeight: window.document.body.offsetHeight
    });
  };

  useEffect(() => {

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}


export default useWindowsHeight;