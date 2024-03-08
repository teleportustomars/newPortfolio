import {  useRef } from "react";
import AboutMe from "/src/components/about-me/AboutMe";
import ContactForm from "/src/components/contact-form/ContactForm";
import Projects from "/src/components/projects/Projects";
import Skills from "/src/components/skills/Skills";
import BackToTop from "/src/components/main-content-layout/BackToTop.jsx";

//define main layout
const MainContent = ({isMobile}) => {
  const contentRef = useRef(null);

  return (
    <>
      <div id="main-content" ref={contentRef}>
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
