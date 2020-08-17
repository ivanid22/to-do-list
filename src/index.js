import './css/bulmaswatch.min.css';
import './css/style.css'
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Project from './project';
import Todo from './todo';
import ChecklistItem from './checklistItem';

const projects = [];

const eventAggregator = getAggregatorInstance();


const renderProjects = () => {
  let projectContainer = document.querySelector('#projectContainer')
  if (projectContainer) {
    projectContainer.innerHTML = '';
  } else {
    projectContainer = document.createElement('div');
    projectContainer.id = 'projectContainer';
  }
  projects.forEach(element => {
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = element.getName();
    projectContainer.appendChild(projectDiv);
  });
  
  projectContainer.appendChild(createNewProject());

  const mainContainer = document.querySelector('#container');
  mainContainer.innerHTML = '';
  mainContainer.appendChild(projectContainer);
};

const validInput = (val) => {
  return /.+/.test(val);
};



eventAggregator.subscribe('createNewProject', (val) => {
  projects.push(Project(val));
});

eventAggregator.subscribe('createNewProject', renderProjects);


const createNewProject = () => {
  const divCreate = document.createElement('div');
  const itemInput = document.createElement('input');
  itemInput.setAttribute('type', 'text');
  itemInput.setAttribute('placeholder', 'New Project');
  const itemButton = document.createElement('button');
  itemButton.innerHTML = 'Create';
  itemButton.onclick = () => {
    console.log('works?')
    if (validInput(itemInput.value)) {
      console.log('Valid')
      eventAggregator.publish('createNewProject', itemInput.value);
    }
  };
  divCreate.append(itemInput, itemButton);
  return divCreate;
};




window.onload = () => {
  // const mainContainer = document.querySelector('#container');
  // mainContainer.appendChild(createNewProject());
  renderProjects();
};