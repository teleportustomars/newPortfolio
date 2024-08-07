import headshot from "/src/assets/images/newHeadshot.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutMe = ({ isMobile, Title }) => {
  //download resume docx
  const ResumeDL = () => {
    const resumeLocation = "/MattAlexanderResume.pdf";

    const resumeClass = isMobile ? "mobileRes" : "desktopRes";

    return (
      <div className={resumeClass} id="resume-dl">
        <a href={resumeLocation} download="MattAlexanderResume.pdf">
          Download My Resume
        </a>
      </div>
    );
  };

  return (
    <div id="aboutMe" className="sectionWrapper">
      <div id="aboutMeContent">
      {<Title section="About Me\" color="primary"/> || <Skeleton />}
        <div id="aboutMeRight">
          <ResumeDL isMobile={isMobile} />
          <div id="headshotContainer">
            {<img
              src={headshot}
              className={isMobile ? "mobileHeadshot" : "desktopHeadshot"}
              id="headshot"
              alt="My Headshot"
            /> || <Skeleton height={isMobile ? 300 : 400} />}
          </div>
          <p id="aboutMeText">
            I&apos;m Matt Alexander, a concept-to-code creative designer and
            developer able to ideate, design, and develop your brand. I aim to
            work with small businesses and marginalized communities to bring
            their passions to life in graphics and websites that are at once
            performant, striking, and effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
