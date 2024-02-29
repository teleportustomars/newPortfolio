import "./App.css";
// import "./components/Styles/Graphics.css"
import { useEffect, useState } from "react";
import ParallaxBG from "./components/ParallaxBG5.jsx";
import Starfield from "./components/Starfield.jsx";
import MainContent from "./components/MainContent.jsx";
import PageTitle from "./components/PageTitle.jsx";
import Moon from "./components/Moon.jsx";
import { isMobile } from "react-device-detect";

function App() {


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const appWidthName = () => {
    if (screenWidth < 650) {
      return "mobile";
    } else {
      return "desktop";
    }
  }

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  // useEffect(() => {
  //   console.log("screenWidth is " + screenWidth + "px");
  // }, [screenWidth]);

  return (
    <div className={`App ${appWidthName()}`}>
      {/* <div id="brickWallBGBig"/> */}
      <PageTitle />
      <MainContent isMobile={isMobile} />
      <Moon screenWidth={screenWidth} />
      <Starfield isMobile={isMobile} />
      <ParallaxBG isMobile={isMobile} />
    </div>
  );
}

export default App;
