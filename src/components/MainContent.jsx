import React, { useState, useEffect, useRef } from "react";
import "./Styles/mainContent.css";
import AboutMe from "./AboutMe";
import ContactForm from "./ContactForm";
import Projects from "./Projects";
// import PageTitle from "./PageTitle2";
import Skills from "./Skills";
import BackToTop from "./BackToTop";


const MainContent = ({isMobile}) => {
  const [topPosition, setTopPosition] = useState(window.innerHeight);
  const contentRef = useRef(null);
  const offset = 0;

  useEffect(() => {

    setTopPosition(window.innerHeight - offset);

    window.addEventListener("resize", () => {
      setTopPosition(window.innerHeight - offset);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setTopPosition(window.innerHeight - offset);
      });
    }
  }, []);

  useEffect(() => {
    console.log("topPosition is " + topPosition + "px");
  })

  const mainStyles = {
    // top: `${topPosition}px`,
  };

  return (
    <>
      {/* <PageTitle topPosition={topPosition} /> */}
      <div id="main-content" ref={contentRef} style={mainStyles}>
        <div className="brickWallBig2"/>
        <div id="brickWallBGBig2"/> 
        <Skills />
        <AboutMe isMobile={isMobile} />
        <Projects isMobile={isMobile} />
        <ContactForm />
        <BackToTop />
      </div>
    </>
  );
};

export default MainContent;
