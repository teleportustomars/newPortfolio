import {useEffect} from 'react'
 const ResumeDL = ({isMobile}) => {

    const resumeLocation = "/src/assets/downloads/dlResume.docx";

    const resumeClass = isMobile ? "mobileRes" : "desktopRes";


    return (
      <div className={resumeClass} id="resume-dl">
        <a href={resumeLocation} download="My_Resume.docx">Download My Resume</a>
      </div>
    )
  }

  export default ResumeDL;