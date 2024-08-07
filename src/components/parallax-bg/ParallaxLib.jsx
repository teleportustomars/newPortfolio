/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useParallax } from "react-scroll-parallax";

const ParallaxBG = ({ isMobile }) => {
  function handleResize() {
    let canvasHeight = window.innerHeight;
    console.log(canvasHeight);
  }
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
    speed,
    scale,
    rotateX,
    translateY
  }) {
    const paraProps = { speed: speed, rotateX: rotateX, scale: scale, translateY:translateY}
    const { ref } = useParallax(paraProps);
    const cityScapeStyle = {
      zIndex: zIndex,
    };

    return (
      <>
        <div
          ref={ref}
          className={`cityscape ${cityClass}`}
          style={cityScapeStyle}
        ></div>
      </>
    );
  });

  //I don't know why I need this, but I do
  CityScape.displayName = "CityScape";
  

  return (
    <div className="parallax-bg" style={{ pointerEvents: "none" }}>
      <CityScape cityClass="city-scape1" zIndex={3} speed={15} rotateX = {[5, -10]} scale = {[1,1.2]} translateY = {[15, 30]}/>
      <CityScape cityClass="city-scape2" zIndex={2} speed={20} rotateX = {[10, -20]} scale = {[.75,1.4]} translateY = {[4, -7]} />
      <CityScape cityClass="city-scape3" zIndex={1} speed={40} rotateX = {[20, -30]} scale = {[.95,1.6]} translateY = {[2, -10]} />
    </div>
  );
};

export default ParallaxBG;
