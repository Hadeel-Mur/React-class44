import { useState, useEffect } from 'react';
import { useDebugValue } from 'react';


function useAvatarSize(minWidth, maxWidth) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const isSizingInRange = windowSize.width >= minWidth && windowSize.width <= maxWidth;

useDebugValue(`Window Size: ${minWidth}px - ${maxWidth}`, (label) => ({
    minWidth,
    maxWidth,
    isSizingInRange
}))
 return isSizingInRange; }

export default useAvatarSize;
