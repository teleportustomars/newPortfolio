import { useRef } from "react";
import AboutMe from "/src/components/about-me/AboutMe";
import ContactForm from "/src/components/contact-form/ContactForm";
import Projects from "/src/components/projects/Projects";
import Skills from "/src/components/skills/Skills";
import BackToTop from "/src/components/main-content-layout/BackToTop.jsx";

//define main layout
const MainContent = ({ isMobile }) => {
  const contentRef = useRef(null);

  const Divider = () => {
    return (
      <div className="neonDividerParent">
      <div className="neonDivider" />
    </div>
    );
  };

  return (
    <>
      <div id="main-content" ref={contentRef}>
        <div className="brickWallBig2" />
        <div id="brickWallBGBig2" />
        <Skills />
        <AboutMe isMobile={isMobile} />
        <Divider />
        <Projects isMobile={isMobile} />
        <Divider />
        <ContactForm />
        <BackToTop />
      </div>
    </>
  );
};

export default MainContent;
