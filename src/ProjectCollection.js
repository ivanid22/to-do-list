const ProjectCollection = () => {
  const projects = [];
  let activeProject = null;

  const getProject = (id) => {
    const found = projects.find((project) => project.getId() === id);
    return found;
  };

  const getProjects = () => projects;

  const addProject = (project) => {
    projects.push(project);
  };

  const removeProject = (project) => {
    projects.splice(projects.indexOf(project), 1);
  };

  const updateProject = (id, fields) => {
    const index = projects.indexOf(getProject(id));
    projects[index] = {
      ...getProject(id),
      ...fields,
    };
  };

  const getLength = () => projects.length;
  const getLastProject = () => {
    if (projects.length === 0) return null;
    return projects[projects.length - 1];
  }

  const getActiveProject = () => activeProject;
  const setActiveProject = (project) => {
    if (!project) activeProject = null;
    else activeProject = project;
  };

  return {
    getProject,
    addProject,
    removeProject,
    updateProject,
    getActiveProject,
    setActiveProject,
    getLength,
    getLastProject,
    getProjects,
    projects,
  };
};

let collectionInstance = null;

const getCollectionInstance = () => {
  if (!collectionInstance) collectionInstance = ProjectCollection();
  return collectionInstance;
};

export default getCollectionInstance;