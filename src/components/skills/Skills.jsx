import { useState } from "react";
import adobeLogo from "/src/assets/glowgos/cc.png";
import cssLogo from "/src/assets/glowgos/css.png";
import htmlLogo from "/src/assets/glowgos/html.png";
import nodeLogo from "/src/assets/glowgos/node.png";
import reactLogo from "/src/assets/glowgos/react.png";

const logos = [
  { src: adobeLogo, title: "adobe cc" },
  { src: cssLogo, title: "css3" },
  { src: htmlLogo, title: "html5" },
  { src: nodeLogo, title: "nodejs" },
  { src: reactLogo, title: "reactjs" }
];

const Tooltip = ({ text }) => {
  return <div className="tooltip">{text}</div>;
};

const Skills = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div id="skillsParent">
      {logos.map((logo, index) => (
        <div className={hoveredIndex === index ? "logoContainerHovered" : "logoContainer"} id="skillContainer" key={index}>
          <img
            key={index}
            src={logo.src}
            className="logo"
            alt="logo"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
          {/* Show tooltip if hovered over */}
          {hoveredIndex === index && <Tooltip text={logo.title} />}
        </div>
      ))}
    </div>
  );
};

export default Skills;
