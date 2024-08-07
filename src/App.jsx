import "./App.css";
import { useState, useEffect, useRef } from "react";
import ParallaxLib from "./components/parallax-bg/ParallaxLib.jsx";
import Starfield from "./components/starfield/Starfield.jsx";
import MainContent from "./components/main-content-layout/MainContent.jsx";
import PageTitle from "./components/site-title/PageTitle.jsx";
import Moon from "./components/moon-nav/Moon.jsx";
import { isMobile } from "react-device-detect";
// import {ParallaxProvider} from "react-scroll-parallax";
import {AudioProvider} from "./AudioContext.jsx";
import AudioController from "./components/audio-control/AudioController.jsx";
import useScreenSize from "./useScreenSize.jsx";
import { useParallax } from "react-scroll-parallax";

function App() {
  const screenSize = useScreenSize();
  const [useSound, setUseSound] = useState(false);
  // const [scrollEl, setScrollEl] = useState(null);
  // const ref = useRef();

  // useEffect(()=> {
  //   setScrollEl(ref.current)
  // })

  const appWidthName = () => {
    if (screenSize.width < 650) {
      return "mobile";
    } else {
      return "desktop";
    }
  }

  // const parallaxProgress = useParallax({
  //   onProgressChange: (progress) => {
  //     if (parallaxProgress.ref.current) {
  //       console.log(progress.toString())
  //     }
  //   },
  // });

  return (
          <AudioProvider>
          <AudioController useSound={useSound} setUseSound={setUseSound} />
          <PageTitle screenSize={screenSize} />
          <div  className={`App ${appWidthName()}`} rel="preload">
            <MainContent isMobile={isMobile} />
            <Moon screenWidth={screenSize.width} />
            <Starfield screenSize={screenSize} isMobile={isMobile} />
            <ParallaxLib isMobile={isMobile} />
          </div>
          </AudioProvider>
  );
}

export default App;
