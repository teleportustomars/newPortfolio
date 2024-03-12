import { useState, useEffect } from "react";


const PageTitle = () => { //site title seen on load
  const [windowHeight, setWindowHeight] = useState();

  const style = {
    height: `${windowHeight}px`,
  };

  //set window height to ensure page title is always at the bottom on load and on resize
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowHeight(window.innerHeight);
      });
    };
  }, []);

  return (
    <div id="pageTitle" style={style}>
      <div id="downArrow" />
      <div id="pageTitleContent">
        <h1>matt alexander</h1>
        <h2>nocturnal web weaver</h2>
      </div>
    </div>
  );
};

export default PageTitle;
