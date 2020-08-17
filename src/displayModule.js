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
      projectA.textContent = element.getName();
      projectLi.setAttribute('data-attribute', element.getId());
      projectLi.appendChild(projectA);
      projectContainer.appendChild(projectLi);
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
      }
      else {
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
