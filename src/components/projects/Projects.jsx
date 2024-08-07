import projectsList from './projectsList'; //js object
import Project from "./Project.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Projects = ({isMobile, Title}) => {

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
      <Title section="Projects\" color="secondary"/>
      <p id="project-instructions">{instructionText()}</p>
      <div id="project-container">
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
        )) || <Skeleton count={3} />}
      </div>
    </div>
  );
};

export default Projects;
