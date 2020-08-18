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
  if (projects.getLength() === 0) projects.setActiveProject(null);
  if (pid === projects.getActiveProject().getId()) {
    projects.setActiveProject(projects.getLastProject());
  }
  displayModule.renderProjects(projects.getProjects(), projects.getActiveProject().getId());
});

eventAggregator.subscribe('selectedProject', (id) => {
  console.log(projects.getProject(id));
  projects.setActiveProject(projects.getProject(id));
  displayModule.displayProjectTitle(projects.getProject(id).getName());
});

eventAggregator.subscribe('clickedNewTodo', () => {
  console.log('>>>>>>>>>> New todo!');
});
