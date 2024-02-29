import "./Styles/PageTitle.css";
import { useState, useEffect } from "react";

const PageTitle = () => {
  const [windowHeight, setWindowHeight] = useState();

  const style={
    // position: "absolute",
    // top: 0,
    // left: 0,
    zIndex: 1000,
    height: `${windowHeight}px`,
    width: "100%",
    display: "flex",
    pointerEvents: "none",
    userSelect: "none",
  }

  

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    console.log("windowHeight is " + windowHeight + "px");
  })

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <div
      id="pageTitle"
      style={style}
    >
      <div id="downArrow" />
      <div id="pageTitleContent">
        <h1>matt alexander</h1>
        <h2>nocturnal web weaver</h2>
      </div>
    </div>
  );
};

export default PageTitle;
