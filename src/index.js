import './css/bulmaswatch.min.css';
import './css/style.css';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import moment from 'moment';
import Project from './project';
import ChecklistItem from './checklistItem';
import Todo from './todo';
import displayModule from './displayModule';
import getCollectionInstance from './ProjectCollection';
import './Subscriptions';

window.collection = getCollectionInstance();
window.Project = Project;
window.Todo = Todo;
window.ChecklistItem = ChecklistItem;
const projects = getCollectionInstance();

const eventAggregator = getAggregatorInstance();

window.moment = moment;

/*const deleteProject = (id) => {
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
};*/

window.onload = () => {
  //displayModule.renderProjects(projects);
  displayModule.initListeners();
  eventAggregator.publish('appInitialized');
  window.projects = projects;
  window.eventAggregator = eventAggregator;
};