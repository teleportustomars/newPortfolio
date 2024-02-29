/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import cityScape from "../assets/cityScape3-1.png";
import "./Styles/ParallaxBG.css";

const debounce = (func, delay) => {
  let animationFrameId;

  return function (...args) {
    cancelAnimationFrame(animationFrameId);

    animationFrameId = requestAnimationFrame(() => {
      func.apply(this, args);
    });
  };
};

const ParallaxBG = ({isMobile}) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);

  const handleResize = useCallback(
    debounce(() => {
      let canvasHeight = window.innerHeight;
      console.log(canvasHeight);
    }, 200), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    const handleScrollDebounced = debounce(
      () => handleScroll(window.scrollY),
      
    );
   if(!isMobile){ window.addEventListener("scroll", handleScrollDebounced);
    return () => window.removeEventListener("scroll", handleScrollDebounced);}
  }, [handleScroll]);

  useEffect(() => {
    if(!isMobile){window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);}
  }, [handleResize]);
  // eslint-disable-next-line react/prop-types
  const CityScape = React.memo(function CityScapeMemoized({
    cityClass,
    zIndex,
    parallaxMultiplier,
  }) {
    const parallaxRate = useMemo(() => {
      const screenPortion = 0.3;
      const vpHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollableHeight = docHeight - vpHeight;
      const maxHeight = vpHeight * screenPortion;
      return (maxHeight / scrollableHeight) * parallaxMultiplier;
    }, [parallaxMultiplier]);

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

  CityScape.displayName = "CityScape";

  return (
    <div className="parallax-bg" style={{ pointerEvents: "none" }}>
      <CityScape
        cityClass="city-scape1"
        zIndex={3}
        color="#472047"
        cityHeight={400}
        numberOfCities={2}
        cityLayer={cityScape}
        parallaxMultiplier={1.5}
      />
      <CityScape
        cityClass="city-scape2"
        zIndex={2}
        color="#673d67"
        cityHeight={300}
        numberOfCities={2}
        cityLayer={cityScape}
        parallaxMultiplier={2}
      />
      <CityScape
        cityClass="city-scape3"
        zIndex={1}
        color="#784d78"
        cityHeight={200}
        numberOfCities={3}
        cityLayer={cityScape}
        parallaxMultiplier={3}
      />
      <CityScape
        cityClass="city-scape4"
        zIndex={0}
        color="#836683"
        cityHeight={100}
        numberOfCities={4}
        cityLayer={cityScape}
        parallaxMultiplier={4}
      />
    </div>
  );
};

export default ParallaxBG;
