// import { useState, useEffect } from "react";
import headshot from "/src/assets/images/fullHeadshot.jpeg";
import ResumeDL from "./ResumeDL.jsx";
import "./styles/AboutMe.css";

const AboutMe = ({ isMobile }) => {
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
            I&apos;m Matt Alexander, a web developer and designer based in
            Philadelphia. I have a passion for creating beautiful, intuitive,
            and performant websites and applications for a modern audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
