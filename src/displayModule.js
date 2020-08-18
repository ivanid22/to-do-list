import { getAggregatorInstance } from "@ivanid22/js-event-aggregator";

const displayModule = (() => {
  const eventAggregator = getAggregatorInstance();

  const validInput = (val) => {
    return /.+/.test(val);
  };

  const renderProjects = (projects) => {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = '';
    projects.forEach(element => {
      const projectLi = document.createElement('li');
      const projectA = document.createElement('a');
      const projectDel = document.createElement('button');
      projectA.textContent = element.getName();
      projectDel.classList = 'delete delete-project-button';
      projectLi.classList = 'project-name';
      projectLi.setAttribute('data-attribute', element.getId());
      projectLi.append(projectA, projectDel);
      projectContainer.appendChild(projectLi);

      projectDel.onclick = () => {
        const parent = projectDel.parentElement.attributes[1].value
        console.log(`Data attribute: ${parent}`);
        eventAggregator.publish('deleteProject', parent);
      };
    });
  };

  const initListeners = () => {
    const itemButton = document.querySelector('.add-project-button');
    const itemInput = document.querySelector('.add-project-input');
    itemButton.onclick = () => {
      if (validInput(itemInput.value)) {
        itemInput.classList.remove('is-danger');
        eventAggregator.publish('createNewProject', itemInput.value);
        itemInput.value = '';
      } else {
        itemInput.classList.add('is-danger');
      }
    };
    
  };

  return {
    initListeners,
    renderProjects,
  };
})();

export default displayModule;
