import React, { useState, useEffect, useRef, Suspense } from "react";
import "./Styles/mainContent.css";
const AboutMe = React.lazy(() => import("./AboutMe"));
const ContactForm = React.lazy(() => import("./ContactForm"));
const Projects = React.lazy(() => import("./Projects"));
// import PageTitle from "./PageTitle2";
import Skills from "./Skills";


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
        <Suspense
          fallback={
            <div className="fallback">
              <h1>Loading...</h1>
            </div>
          }
        >
          <Skills />
        </Suspense>
        <Suspense
          fallback={
            <div className="fallback">
              <h1>Loading...</h1>
            </div>
          }
        >
          <AboutMe isMobile={isMobile} />
        </Suspense>
        <Suspense
          fallback={
            <div className="fallback">
              <h1>Loading...</h1>
            </div>
          }
        >
          <Projects isMobile={isMobile} />
        </Suspense>
        <Suspense
          fallback={
            <div className="fallback">
              <h1>Loading...</h1>
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </div>
    </>
  );
};

export default MainContent;
