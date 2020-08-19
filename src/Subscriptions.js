import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import getCollectionInstance from './ProjectCollection';
import moment from 'moment';
import Project from './project';
import Todo from './todo';
import displayModule from './displayModule';

const projects = getCollectionInstance();
const eventAggregator = getAggregatorInstance();

console.log('running');

eventAggregator.subscribe('createdNewProject', (val) => {
  const newProject = Project(val);
  projects.addProject(newProject);
  eventAggregator.publish('selectedProject', newProject.getId());
  displayModule.renderProjects(projects.getProjects(), projects.getActiveProject().getId());
});

eventAggregator.subscribe('deletedProject', (val) => {
  const pid = parseInt(val, 10);
  projects.removeProject(projects.getProject(pid));
  const activeId = projects.getActiveProject() ? projects.getActiveProject().getId() : null;
  displayModule.renderProjects(projects.getProjects(), activeId);
  eventAggregator.publish('selectedProject', activeId);
});

eventAggregator.subscribe('selectedProject', (id) => {
  if (id == null) displayModule.displayProjectTitle('');
  else {
    projects.setActiveProject(projects.getProject(id));
    displayModule.displayProjectTitle(projects.getProject(id).getName());
    displayModule.renderTodos(projects.getActiveProject());
  }
});

eventAggregator.subscribe('clickedNewTodo', () => {
  document.querySelector('.new-todo-modal').classList.add('is-active');
});

eventAggregator.subscribe('clickedNewTodo', () => {
});

eventAggregator.subscribe('closedTodoModal', () => {
  document.querySelector('.new-todo-modal').classList.remove('is-active');
});

eventAggregator.subscribe('submitedTodo', (data) => {
  const newTodo = Todo(data.title);
  newTodo.setDescription(data.description);
  newTodo.setDueDate(moment(data.duedate).valueOf());
  newTodo.setPriority(parseInt(data.priority, 10));
  if (projects.getActiveProject()) {
    projects.getActiveProject().addTodo(newTodo);
  }
});

eventAggregator.subscribe('addedTodo', () => {
  displayModule.renderTodos(projects.getActiveProject());
});
