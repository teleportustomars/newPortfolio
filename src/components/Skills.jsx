import adobeLogo from "/src/assets/glowgos/cc.png";
import cssLogo from "/src/assets/glowgos/css.png";
import htmlLogo from "/src/assets/glowgos/html.png";
import nodeLogo from "/src/assets/glowgos/node.png";
import reactLogo from "/src/assets/glowgos/react.png";
import "/src/components/Styles/Skills.css";

const Skills = () => {
  const logos = [adobeLogo, cssLogo, htmlLogo, nodeLogo, reactLogo];

  return (
    <div
      id="skillsParent"
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo}
          className="logo"
          alt="logo"
        />
      ))}
    </div>
  );
};

export default Skills;
