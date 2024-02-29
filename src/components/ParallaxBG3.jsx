import React, { useEffect, useState, useCallback } from "react";
import cityScape from "../assets/cityScape3-1.png";
import "./Styles/ParallaxBG.css"


const debounce = (func, delay) => {
  let animationFrameId;

  return function (...args) {
    cancelAnimationFrame(animationFrameId);

    animationFrameId = requestAnimationFrame(() => {
      func.apply(this, args);
    });
  };
};

const ParallaxBG = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);  
  const handleResize = useCallback(() => {
    let canvasHeight = window.innerHeight;
  }, []);



  useEffect(() => {
    // Use debounce for handleScroll
    const handleScrollDebounced = debounce(
      () => handleScroll(window.scrollY),
      16
    );

    window.addEventListener("scroll", handleScrollDebounced);

    return () => window.removeEventListener("scroll", handleScrollDebounced);
  }, [handleScroll]);

  useEffect(() => {
    console.log(scrollY);
  }, [scrollY]);

  useEffect(() => {
    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  

  // eslint-disable-next-line react/prop-types
  const CityScape = React.memo(function CityScapeMemoized({
    cityClass,
    color,
    zIndex,
    blur,
    cityHeight,
    numberOfCities,
    cityLayer,
    parallaxRate
  }) {

    const MemoizedCityImage = React.memo(function CityImage({ src, zIndex, blur }) {
      const style = {
        width: `${100 / numberOfCities}%`,
        objectFit: "cover",
        height: "100%",
        objectPosition: "bottom",
        overflow: "visible",
        zIndex: zIndex,
        pointerEvents: "none",
        filter: blur ? "blur(1px)" : "none",
      }
      return (
        <img
          src={src}
          style={style}
        />
      );
    });
    
    const cityScapeStyle = {
      backgroundColor: color,
      zIndex: zIndex,
      filter: blur ? "blur(1px)" : "none",
      transform: `translateY(${-scrollY * parallaxRate}px)`,
    }

    const cityBlockStyle = {
      top: `${-1 * cityHeight + "px"}`,
      height: `${cityHeight + "px"}`,
    }

    return (
      <>
        <div
          className={`cityscape ${cityClass}`}
          style={cityScapeStyle}
        >
          <div
            style={cityBlockStyle}
            className="cityBlock"
          >
            {Array.from({ length: numberOfCities }).map((_, i) => (
              <MemoizedCityImage
                key={i}
                src={cityLayer}
                zIndex={zIndex}
                blur={blur}
              />
            ))}
          </div>
        </div>
      </>
    );
  });

  CityScape.displayName = "CityScape";

  return (
    <div className="parallax-bg" style={{ pointerEvents: "none" }}>
      <CityScape
        cityClass="city-scape1"
        parallaxRate={0.1}
        zIndex={3}
        color="#472047"
        blur={false}
        cityHeight={400}
        numberOfCities={2}
        cityLayer={cityScape}
      />
      <CityScape
        cityClass="city-scape2"
        parallaxRate={0.2}
        zIndex={2}
        color="#673d67"
        blur={false}
        cityHeight={300}
        numberOfCities={2}
        cityLayer={cityScape}
      />
      <CityScape
        cityClass="city-scape3"
        parallaxRate={0.3}
        zIndex={1}
        color="#784d78"
        blur={false}
        cityHeight={200}
        numberOfCities={3}
        cityLayer={cityScape}
      />
      <CityScape
        cityClass="city-scape4"
        parallaxRate={0.4}
        zIndex={0}
        color="#836683"
        blur={false}
        cityHeight={100}
        numberOfCities={4}
        cityLayer={cityScape}
      />
    </div>
  );
};

export default ParallaxBG;
