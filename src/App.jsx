import "./App.css";
import { useEffect, useState } from "react";
import ParallaxBG from "./components/parallax-bg/ParallaxBG.jsx";
import Starfield from "./components/starfield/Starfield.jsx";
import MainContent from "./components/main-content-layout/MainContent.jsx";
import PageTitle from "./components/site-title/PageTitle.jsx";
import Moon from "./components/moon-nav/Moon.jsx";
import { isMobile } from "react-device-detect";

function App() {

  //set up window size and mobile detection
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


  return (
    <div className={`App ${appWidthName()}`}>
      <PageTitle />
      <MainContent isMobile={isMobile} />
      <Moon screenWidth={screenWidth} />
      <Starfield isMobile={isMobile} />
      <ParallaxBG isMobile={isMobile} />
    </div>
  );
}

export default App;
