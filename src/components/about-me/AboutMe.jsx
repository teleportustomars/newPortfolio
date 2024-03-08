import headshot from "/src/assets/images/fullHeadshot.jpeg";

const AboutMe = ({ isMobile }) => {

  //download resume docx
  const ResumeDL = () => { 

    const resumeLocation = "/src/assets/downloads/dlResume.docx";

    const resumeClass = isMobile ? "mobileRes" : "desktopRes";


    return (
      <div className={resumeClass} id="resume-dl">
        <a href={resumeLocation} download="My_Resume.docx">Download My Resume</a>
      </div>
    )
  }

  return (
    <div id="aboutMe" className="sectionWrapper">
      <div id="aboutMeContent">
        <div
          id="aboutMeLeft"
          className={isMobile ? "mobileLeft" : "desktopLeft"}
        >
          <h1 id="aboutMeH1">About Me</h1>
        </div>
        <div id="aboutMeRight">
          <ResumeDL isMobile={isMobile} />

          <div id="headshotContainer">
            <img
              src={headshot}
              className={isMobile ? "mobileHeadshot" : "desktopHeadshot"}
              id="headshot"
              alt="My Headshot"
            />
          </div>
          <p id="aboutMeText">
            I&apos;m Matt Alexander, a concept-to-code creative designer and developer able to ideate, design, and develop your brand. I 
            aim to work with small businesses and marginalized communities to
            bring their passions to life in graphics and websites that are at once performant, striking, and effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
