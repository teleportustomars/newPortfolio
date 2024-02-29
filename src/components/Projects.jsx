import React, { Suspense } from 'react';
import projectsList from './projectsList';
import "./styles/Projects.css"
import Project from "./Project.jsx";

// const LazyProject = React.lazy(() => import('./Project'));

const Projects = ({isMobile}) => {

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
        {/* <Suspense fallback={<div>Loading projects...</div>}>
          {projectsList.map((project, index) => (
            <LazyProject
              key={index}
              projectName={project.projectName}
              projectDescription={project.projectDescription}
              projectLink={project.projectLink}
              screenshot={project.screenshot}
              skills={project.skills}
              bgColor={project.background}
            />
          ))}
        </Suspense> */}
      </div>
    </div>
  );
};

export default Projects;
