import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Project from './project';
import CheckistItem from './checklistItem';
import Todo from './todo';

const ProjectCollection = () => {
  let projects = [];
  let activeProject = null;
  const eventsAggregator = getAggregatorInstance();

  const serialize = () => {
    const serializedProjects = [];
    projects.forEach(project => {
      serializedProjects.push(project.serialize());
    });
    return {
      activeProject: activeProject.serialize(),
      projects: serializedProjects,
    };
  };

  const getProject = (id) => {
    const found = projects.find((project) => project.getId() === id);
    return found;
  };

  const fetchLocalStorageData = () => {
    projects = [];
    const data = JSON.parse(localStorage.getItem('projects'));
    if (data) {
      data.projects.forEach(storedProject => {
        const tempProject = Project(storedProject.name);
        if (storedProject.todos) {
          storedProject.todos.forEach(storedTodo => {
            const tempTodo = Todo(storedTodo.title);
            if (storedTodo.checklists) {
              storedTodo.checklists.forEach(storedChecklistItem => {
                const tempChecklistItem = CheckistItem(storedChecklistItem.title);
                tempChecklistItem.setId(storedChecklistItem.id);
                tempChecklistItem.setStatus(storedChecklistItem.status);
                tempTodo.addCheckListItem(tempChecklistItem);
              });
            }
            tempTodo.setId(storedTodo.id);
            tempTodo.setDescription(storedTodo.description);
            tempTodo.setDueDate(storedTodo.dueDate);
            tempTodo.setPriority(storedTodo.priority);
            tempProject.addTodo(tempTodo, false);
          });
        }
        tempProject.setId(storedProject.id);
        tempProject.setName(storedProject.name);
        projects.push(tempProject);
      });
      activeProject = getProject(data.activeProject.id);
    } else {
      const defaultProject = Project('Default project');
      projects.push(defaultProject);
      activeProject = defaultProject;
    }
    eventsAggregator.publish('loadedLocalStorage', null);
  };

  const updateLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(serialize()));
  };

  const getProjects = () => projects;

  const addProject = (project) => {
    projects.push(project);
    activeProject = project;
  };

  const removeProject = (project) => {
    projects.splice(projects.indexOf(project), 1);
    if (activeProject === project) {
      if (projects.length > 0) activeProject = projects[projects.length - 1];
      else activeProject = null;
    }
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
  };

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
    serialize,
    updateLocalStorage,
    fetchLocalStorageData,
    projects,
  };
};

let collectionInstance = null;

const getCollectionInstance = () => {
  if (!collectionInstance) collectionInstance = ProjectCollection();
  return collectionInstance;
};

export default getCollectionInstance;