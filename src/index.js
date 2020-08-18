import './css/bulmaswatch.min.css';
import './css/style.css';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import moment from 'moment';
import Project from './project';
import displayModule from './displayModule';

const projects = [];
let activeProjectId;

const eventAggregator = getAggregatorInstance();

window.moment = moment;

const deleteProject = (id) => {
  let index = null;
  projects.forEach(project => {
    if (project.getId() === parseInt(id, 10)) {
      index = projects.indexOf(project);
      console.log(index);
    }
  });
  console.log(`Index to delete: ${index}`)
  projects.splice(index, 1);
};

const findProjectbyId = (id) => {
  const found = projects.find(project => project.getId() === id);
  return found;
};

eventAggregator.subscribe('createdNewProject', (val) => {
  const newProject = Project(val);
  projects.push(newProject);
  eventAggregator.publish('selectedProject', newProject.getId());
  displayModule.renderProjects(projects, activeProjectId);
});

eventAggregator.subscribe('deletedProject', (val) => {
  const pid = parseInt(val, 10);
  deleteProject(val);
  if (projects.length === 0) activeProjectId = null;
  if (pid === activeProjectId) activeProjectId = projects[projects.length - 1].getId();
  displayModule.renderProjects(projects, activeProjectId);
});

eventAggregator.subscribe('selectedProject', (id) => {
  activeProjectId = id;
  window.activeProjectId = id;
  displayModule.displayProjectTitle(findProjectbyId(id).getName());
});

eventAggregator.subscribe('clickedNewTodo', () => {
  console.log('>>>>>>>>>> New todo!');
});


window.onload = () => {
  //displayModule.renderProjects(projects);
  displayModule.initListeners();
  window.projects = projects;
  window.activeProjectId = activeProjectId;
};