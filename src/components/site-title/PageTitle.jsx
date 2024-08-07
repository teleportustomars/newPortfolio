// import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Title from "../titles/Titles.jsx";
import { useParallax } from "react-scroll-parallax";

// eslint-disable-next-line react/prop-types
const PageTitle = ({ screenSize }) => {
  //site title seen on load

  const style = {
    // eslint-disable-next-line react/prop-types
    height: `${screenSize.height}px`,
  };

  const titleProps = {
    speed: 3,
    translateY: [-40, 40],
    translateX: [-40, 40],
    // scale: [1,.5],
  };

  // const {ref} = useParallax({speed: titleProps.speed, translateY: titleProps.translateY, translateX: titleProps.translateX, scale: titleProps.scale,})

  const parallaxProgress = useParallax({
    onProgressChange: (progress) => {
      if (parallaxProgress.ref.current) {
        parallaxProgress.ref.current.style.setProperty(
          "--progress",
          progress.toString()
        );
      }
    },
  });

  const PageTitleContent = () => {
    return (
      <div id="pageTitleContent">
        <Title section="Matt Alexander" color="main" />
        <h2>nocturnal web weaver</h2>
      </div>
    );
  };

  return (
    <div ref={parallaxProgress.ref} id="pageTitle" >
      <div id="downArrow" />
      {<PageTitleContent /> || <Skeleton count={10} />}
    </div>
  );
};

export default PageTitle;
