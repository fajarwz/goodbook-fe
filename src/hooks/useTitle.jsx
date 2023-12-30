import { useRef, useEffect } from "react";

const useTitle = title => {
    const documentDefined = typeof document !== 'undefined';
    const originalTitle = useRef(documentDefined ? document.title : null);
  
    useEffect(() => {
      if (!documentDefined) return;

      const storedOriginalTitle = originalTitle.current;
  
      if (document.title !== title) document.title = title;
  
      return () => {
        document.title = storedOriginalTitle;
      };
    }, [documentDefined, title]);
};

export default useTitle