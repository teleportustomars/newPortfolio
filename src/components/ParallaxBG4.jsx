import React, { useEffect, useState, useCallback } from "react";
import newCityScape from "../assets/images/newCityScape.png";
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
  const City = ({speed}) => {

    const styles = {
      transform: `translateY(${-scrollY * speed}px)`,
    }

    return (<div className="city" style={styles}></div>)
  }   

  return (
    <div id="parallaxParent">
        <City speed={0.5} />
        <City speed={0.4} />
        <City speed={0.3} />
    </div>
  )
};

export default ParallaxBG;
