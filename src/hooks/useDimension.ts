
import {useState, useEffect, useLayoutEffect, type RefObject} from 'react';

export const useDimensions = (targetRef:RefObject<HTMLDivElement | null> ) => {
    const getDimensions = () => {
      if (targetRef)
        return {
            width: targetRef.current ? targetRef.current.offsetWidth : 0,
            height: targetRef.current ? targetRef.current.offsetHeight : 0
        };
    };

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => {
        setDimensions(getDimensions());
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        handleResize(); // Update dimensions on initial render
    }, []);

    return dimensions;
};
