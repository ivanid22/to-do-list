import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import getCollectionInstance from './ProjectCollection';
import Project from './project';
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
  }
});

eventAggregator.subscribe('clickedNewTodo', () => {
  console.log('>> open Modal');
  document.querySelector('.new-todo-modal').classList.add('is-active');
});

eventAggregator.subscribe('clickedNewTodo', () => {
  console.log('>>>>>>>>>> New todo!');
});

eventAggregator.subscribe('closedTodoModal', () => {
  console.log('>> close Modal');
  document.querySelector('.new-todo-modal').classList.remove('is-active');
});
