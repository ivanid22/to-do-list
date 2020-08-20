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

window.onload = () => {
  displayModule.initListeners();
  eventAggregator.publish('appInitialized');
  window.projects = projects;
  window.eventAggregator = eventAggregator;
};