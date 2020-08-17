import './css/bulmaswatch.min.css';
import './css/style.css'
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Project from './project';
import moment from 'moment';
import displayModule from './displayModule';
import Todo from './todo';
import ChecklistItem from './checklistItem';

const projects = [];

const eventAggregator = getAggregatorInstance();

window.moment = moment;

eventAggregator.subscribe('createNewProject', (val) => {
  projects.push(Project(val));
  displayModule.renderProjects(projects);
});

window.onload = () => {
  displayModule.renderProjects(projects);
  displayModule.initListeners();
};