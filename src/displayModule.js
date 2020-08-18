import { getAggregatorInstance } from "@ivanid22/js-event-aggregator";

const displayModule = (() => {
  const eventAggregator = getAggregatorInstance();

  const validInput = (val) => {
    return /.+/.test(val);
  };

  const resetNewTodoFields = () => {
    const fields = document.querySelectorAll('.new-todo-field');
    fields.forEach(field => {
      field.value = '';
    });
    document.querySelector('.new-todo-priority').selectedIndex = 0;
  };

  const showValidationError = (element, message) => {
    const errorContainer = element.parentElement.parentElement;
    const errorMessage = document.createElement('p');
    errorMessage.classList = 'help is-danger todo-validation-error';
    errorMessage.textContent = message;
    errorContainer.appendChild(errorMessage);
  };

  const resetActiveProject = () => {
    const elements = document.querySelectorAll('.project-name > a');
    elements.forEach(element => {
      element.classList.remove('is-active');
    });
  };

  const displayProjectTitle = (val) => {
    const titleElement = document.querySelector('.selected-project-title')
    titleElement.textContent = val;
  };

  const renderProjects = (projects, activeProjectId) => {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = '';
    projects.forEach(element => {
      const projectLi = document.createElement('li');
      const projectA = document.createElement('a');
      const projectDel = document.createElement('button');
      projectA.textContent = element.getName();
      if (element.getId() === activeProjectId) projectA.classList.add('is-active');
      projectDel.classList = 'delete delete-project-button';
      projectLi.classList = 'project-name';
      projectLi.setAttribute('data-attribute', element.getId());
      projectLi.append(projectA, projectDel);
      projectContainer.appendChild(projectLi);

      projectA.onclick = () => {
        const selectedId = parseInt(projectA.parentElement.attributes['data-attribute'].value, 10);
        eventAggregator.publish('selectedProject', selectedId);
        resetActiveProject();
        projectA.classList.add('is-active');
      };

      projectDel.onclick = () => {
        const parent = projectDel.parentElement.attributes[1].value
        console.log(`Data attribute: ${parent}`);
        eventAggregator.publish('deletedProject', parent);
      };
    });
  };

  const newTodoModalListeners = () => {
    const newTodoTitle = document.querySelector('.new-todo-title');
    const newTodoDescription = document.querySelector('.new-todo-desc');
    const newTodoDate = document.querySelector('.new-todo-date');
    const newTodoPriority = document.querySelector('.new-todo-priority');
    const submitTodoButton = document.querySelector('.submit-todo-button');
    const closeTodoModal = document.querySelectorAll('.close-todo-modal');
    showValidationError(newTodoTitle, 'Title cannot be empty');
    submitTodoButton.onclick = () => {
      if (validInput(newTodoTitle.value)) {
        eventAggregator.publish('submitedTodo', {
          title: newTodoTitle.value,
          description: newTodoDescription.value,
          date: newTodoDate.value,
          priority: newTodoPriority.value,
        });
        eventAggregator.publish('closedTodoModal');
      }
    };
    closeTodoModal.forEach(button => {
      button.onclick = () => { eventAggregator.publish('closedTodoModal'); };
    });
  };

  const initListeners = () => {
    const itemButton = document.querySelector('.add-project-button');
    const itemInput = document.querySelector('.add-project-input');
    itemButton.onclick = () => {
      if (validInput(itemInput.value)) {
        itemInput.classList.remove('is-danger');
        eventAggregator.publish('createdNewProject', itemInput.value);
        itemInput.value = '';
      } else {
        itemInput.classList.add('is-danger');
      }
    };
    const newTodoButton = document.querySelector('.add-todo-button');
    newTodoButton.onclick = () => {
      resetNewTodoFields();
      eventAggregator.publish('clickedNewTodo');
    };
    newTodoModalListeners();
  };

  return {
    initListeners,
    renderProjects,
    displayProjectTitle,
  };
})();

export default displayModule;
