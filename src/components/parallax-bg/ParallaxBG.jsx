/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo } from "react";

//controllable debounce function to optimize parrallax performance
const debounce = (func, delay) => {
  let animationFrameId;

  return function (...args) {
    cancelAnimationFrame(animationFrameId);

    animationFrameId = requestAnimationFrame(() => {
      func.apply(this, args);
    });
  };
};

const ParallaxBG = ({ isMobile }) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);

  const handleResize = useCallback(
    debounce(() => {
      let canvasHeight = window.innerHeight;
      console.log(canvasHeight);
    }, 200), // Adjust the debounce delay as needed, not currently debouncing
    []
  );

  useEffect(() => {
    const handleScrollDebounced = debounce(() => handleScroll(window.scrollY));
    if (!isMobile) {
      window.addEventListener("scroll", handleScrollDebounced);
      return () => window.removeEventListener("scroll", handleScrollDebounced);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  // eslint-disable-next-line react/prop-types
  const CityScape = React.memo(function CityScapeMemoized({
    
    cityClass,
    zIndex,
    parallaxMultiplier

  }) {

    //calculate parallax rate by dividing how tall the cityscape should be by scrollable height
    const parallaxRate = useMemo(() => {
      const screenPortion = 0.1; //% of screen taken up by final parallax position
      const vpHeight = window.innerHeight; //viewport height
      const docHeight = document.documentElement.scrollHeight; //document height
      const scrollableHeight = docHeight - vpHeight; //scrollable height
      const maxHeight = vpHeight * screenPortion; //max height of parallax
      return (maxHeight / scrollableHeight) * parallaxMultiplier; //parallax rate
    }, [parallaxMultiplier]);

    //move cityscape up based on parallax rate and scrollY
    const cityScapeStyle = {
      zIndex: zIndex,
      transform: `translateY(${parallaxRate * -scrollY}px)`,
    };

    return (
      <>
        <div className={`cityscape ${cityClass}`} style={cityScapeStyle}></div>
      </>
    );
  });

  //I don't know why I need this, but I do
  CityScape.displayName = "CityScape";

  return (
    <div className="parallax-bg" style={{ pointerEvents: "none" }}>
      <CityScape
        cityClass="city-scape1"
        zIndex={3}
        parallaxMultiplier={1.5}
      />
      <CityScape
        cityClass="city-scape2"
        zIndex={2}
        parallaxMultiplier={2}
      />
      <CityScape
        cityClass="city-scape3"
        zIndex={1}
        parallaxMultiplier={3}
      />
    </div>
  );
};

export default ParallaxBG;
