import { useMediaQuery } from 'react-responsive';

const useScreenSizes = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1600px)"
  });
  
  const isTablet = useMediaQuery({
    query: "(max-width: 800px)"
  });

  const isLaptop = useMediaQuery({
    query: "(max-width: 1024px)"
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });

  return { isDesktop, isTablet, isMobile, isLaptop };
};

export default useScreenSizes;