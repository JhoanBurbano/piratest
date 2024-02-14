import { useEffect, useState } from 'react';

export const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string>();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

//No se usó porque rompe las reglas del lazy-loading
