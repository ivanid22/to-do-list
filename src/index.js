import './css/bulmaswatch.min.css';
import './css/style.css';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import moment from 'moment';
import Project from './project';
import displayModule from './displayModule';
import Todo from './todo';
import ChecklistItem from './checklistItem';
import { CLIEngine } from 'eslint';

const projects = [];

const eventAggregator = getAggregatorInstance();

window.moment = moment;

const deleteProject = (id) => {
  projects.forEach(project => {
    console.log(project.getId());
    // if (project.getId() === id) {
    //   const index = projects.indexOf(project);
    //   projects.splice(index, 1);
    // }
  });
};

eventAggregator.subscribe('createNewProject', (val) => {
  projects.push(Project(val));
  displayModule.renderProjects(projects);
});

eventAggregator.subscribe('deleteProject', (val) => {
  deleteProject(val);
  displayModule.renderProjects(projects);
});

window.onload = () => {
  //displayModule.renderProjects(projects);
  displayModule.initListeners();
  window.projects = projects;
};