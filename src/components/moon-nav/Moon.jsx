import { useState, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { AudioContext } from "../../AudioContext";

const Moon = ({screenWidth}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {playMoonOpen, playMoonClose} = useContext(AudioContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      playMoonClose();
    } else {
      playMoonOpen();
    }
  };

  //react-scroll menu
  const menuItems = [
    {
      name: "contact",
      link: "contactForm",
    },
    {
      name: "projects",
      link: "projectsParent",
    },
    {
      name: "about",
      link: "aboutMe",
    },

    {
      name: "home",
      link: "root",
    },
  ];

  //render label for menu based on screen size
  const menuLabel = () => {
    switch (isOpen) {
      case false:
        if(screenWidth < 650){
          return "≡";
        } else {
          return "Menu";
        }
      case true:
        if(screenWidth < 650){
          return "X";
        } else {
          return "Close";
        }
      default:
        return "Menu";
    }
  }

  return (
    <nav className={`top-right ${isOpen ? "open" : ""} ${screenWidth < 650 ? "cornerNav" : ""}`}>
      {menuItems.map((item, index) => (
        <ScrollLink
          key={index}
          to={item.link}
          smooth={true}
          duration={1000}
          className={`disc l${index + 1}`}
        >
          <div>{item.name}</div>
        </ScrollLink>
      ))}
      <a className="disc l5 toggle" onClick={handleToggle}>
        {menuLabel()}
      </a>
    </nav>
  );
};

export default Moon;
