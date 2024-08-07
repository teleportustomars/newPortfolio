import React, { useEffect, useState, useRef } from "react";
import { useScroll } from "react-use";

const ParallaxBG = ({ isMobile }) => {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  useEffect(() => {
    setScrollY(y);
  }, [y]);

  const CityScape = React.memo(function CityScapeMemoized({
    cityClass,
    zIndex,
    speed,
    rotationFactor,
  }) {
    const cityScapeStyle = {
      zIndex: zIndex,
      transform: `
        perspective(1000px)
        rotateX(${scrollY * 0.01 * rotationFactor}deg)
        translateZ(${scrollY * speed * 0.1}px)
      `,
      transformOrigin: 'center bottom',
    };

    return (
      <div
        className={`cityscape ${cityClass}`}
        style={cityScapeStyle}
      ></div>
    );
  });

  CityScape.displayName = "CityScape";

  return (
    <div ref={scrollRef} className="parallax-bg" style={{ 
      pointerEvents: "none",
      perspective: '1000px',
      transformStyle: 'preserve-3d',
      height: '100vh',  // Ensure the div takes full viewport height
      overflow: 'auto', // Make it scrollable
    }}>
      <CityScape cityClass="city-scape1" zIndex={3} speed={0.15} rotationFactor={0.5} />
      <CityScape cityClass="city-scape2" zIndex={2} speed={0.20} rotationFactor={0.7} />
      <CityScape cityClass="city-scape3" zIndex={1} speed={0.25} rotationFactor={0.9} />
    </div>
  );
};

export default ParallaxBG;