import { useMediaQuery } from 'react-responsive';

const useScreenSizes = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1600px)"
  });
  
  const isTablet = useMediaQuery({
    query: "(max-width: 800px)"
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 450px)"
  });

  return { isDesktop, isTablet, isMobile };
};

export default useScreenSizes;