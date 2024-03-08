/* eslint-disable react/prop-types */
import { useState } from "react";

const Project = ({ //individual projects, set up as flip cards
  projectName,
  projectDescription,
  projectDescShort,
  projectLink,
  screenshot,
  skills,
  bgColor,
  projectIcon
}) => {
  const [flipped, setFlipped] = useState(false);
  let touchStartX = 0;
  let touchEndX = 0;

  const handleMouseEnter = () => {
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
  };

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // Adjust as needed
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      setFlipped(!flipped);
    }
  };

  const CardFront = () => {
    return (
      <>
        <img id="screenShot" src={screenshot} alt={projectName} />
        <div id="projectStuff">
          <div className="h-divider" /><h2>{projectDescShort}</h2><div className="h-divider" />
        </div>
      </>
    );
  };

  const CardBack = () => {
    return (
      <>
        <div id="projectStuffBack">
          <h2>{projectName}</h2>
          <p>{projectDescription}</p>
        </div>
        <div className="divider" />
          <div id="projIcon"><img src={projectIcon} /></div>
          <ul id="skillList">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
      </>
    );
  };

  const openLink = () => {
    window.open(projectLink, "_blank");
  }

  return (
    <div id="indivProject">
      <div id="content" onClick={openLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="container">
          <div className={`flip-card ${flipped ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className={`flip-card-front ${bgColor}`}>
                <div className="card-content">
                  <CardFront />
                </div>
              </div>
              <div className={`flip-card-back ${bgColor}`}>
                <div className="card-content">
                  <CardBack />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
