import projectsList from './projectsList'; //js object
import Project from "./Project.jsx";

const Projects = ({isMobile}) => {

  //render instructions based on device
  const instructionText = () => {
    if (isMobile) {
      return "swipe for details, click to visit"
    } else {
      return "hover for details, click to visit"
    }
  }

  return (
    <div id="projectsParent">
      <div id="project-container"><div>
        <h1 id="project-header">
          Projects
        </h1>
        <p id="project-instructions">{instructionText()}</p>
      </div>
        {projectsList.map((project, index) => (
          <Project
            key={index}
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            projectDescShort={project.projectDescShort}
            projectLink={project.projectLink}
            projectIcon={project.projectIcon}
            screenshot={project.screenshot}
            skills={project.skills}
            bgColor={project.background}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
