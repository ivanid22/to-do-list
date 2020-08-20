import { getAggregatorInstance } from "@ivanid22/js-event-aggregator";
import moment from 'moment';

const displayModule = (() => {
  const eventAggregator = getAggregatorInstance();

  const validTitle = (val) => {
    return /.+/.test(val);
  };

  const validDate = (dateString) => {
    const date = moment(dateString).valueOf();
    return (date && (moment().startOf('day').valueOf() < date));
  };

  const resetNewTodoFields = () => {
    const fields = document.querySelectorAll('.new-todo-field');
    fields.forEach(field => {
      field.value = '';
    });
    document.querySelector('.new-todo-priority').selectedIndex = 0;
  };

  const clearTodoValidationMessages = () => {
    const errors = document.querySelectorAll('.todo-validation-error');
    errors.forEach(error => {
      error.remove();
    });
  };

  const showValidationError = (element, message) => {
    const errorContainer = element.parentElement.parentElement;
    const existingError = errorContainer.querySelector('.todo-validation-error');
    if (existingError) existingError.remove();
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
        eventAggregator.publish('deletedProject', parent);
      };
    });
  };

  const createDOMElement = (classes, type, content) => {
    const newDiv = document.createElement(type);
    newDiv.classList = classes;
    if (content) newDiv.innerHTML = content;
    return newDiv;
  };

  const renderChecklistForm = (todo) => {
    const inputField = createDOMElement('field has-addons', 'div');
    const inputControl = createDOMElement('control hidden', 'p');
    const buttonControl = createDOMElement('control hidden', 'p');
    const input = createDOMElement('input is-small', 'input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'New Checkitem');
    const button = createDOMElement('button is-small', 'a', 'Add');
    
    const showForm = createDOMElement('button is-small', 'a', '+');
    showForm.onclick = () => {
      showForm.classList.toggle('hidden');
      inputControl.classList.toggle('hidden');
      buttonControl.classList.toggle('hidden');
    };

    button.onclick = () => {
      showForm.classList.toggle('hidden');
      inputControl.classList.toggle('hidden');
      buttonControl.classList.toggle('hidden');
      eventAggregator.publish('newChecklistClicked', { todo, title: input.value });
    };
    inputControl.append(input);
    buttonControl.append(button);
    inputField.append(showForm, inputControl, buttonControl);
    return inputField;
  };

  const renderChecklistItems = (todo, target) => {
    const checklistContainer = createDOMElement('card-content checklist-container', 'div');
    todo.getAllChecklistItems().forEach(checklistItem => {
      const label = createDOMElement('checkbox checklist-item', 'label');
      const checkboxInput = createDOMElement('', 'input');
      checkboxInput.setAttribute('type', 'checkbox');
      checkboxInput.checked = checklistItem.getStatus();
      const labelContent = createDOMElement('', 'span', checklistItem.getTitle());
      checkboxInput.onchange = () => {
        eventAggregator.publish('checkboxChanged', {
          todo,
          checklistItem,
          checked: checkboxInput.checked,
        });
      };
      label.append(checkboxInput, labelContent);
      checklistContainer.appendChild(label);
    });
    const CheckListForm = renderChecklistForm(todo);
    checklistContainer.append(CheckListForm);
    target.appendChild(checklistContainer);
  };

  const renderTodo = (todo) => {
    const cardPad = createDOMElement('card-padding is-3 column', 'div');
    const card = createDOMElement('card', 'div');
    const cardHeader = createDOMElement('card-header', 'header');
    const cardTitle = createDOMElement('card-header-title','p', todo.getTitle());

    const todoInfo = createDOMElement('card-content todo-due-date', 'div');
    const todoPriority = createDOMElement('has-text-danger', 'p', todo.getPriorityString());
    const todoDueDate = createDOMElement('has-text-grey', 'p', 'Due '.concat(moment(todo.getDueDate()).fromNow()));

    const todoDescription = createDOMElement('card-content', 'div');
    const todoDescriptionText = createDOMElement('', 'p', todo.getDescription());

    const deleteTodo = createDOMElement('delete delete-todo-button', 'button');
    deleteTodo.onclick = () => { eventAggregator.publish('clickedDeleteTodo', todo); };

    todoDescription.append(todoDescriptionText);
    todoInfo.append(todoPriority, todoDueDate);
    cardHeader.append(cardTitle, deleteTodo);
    card.append(cardHeader, todoInfo, todoDescription);
    cardPad.append(card);
    renderChecklistItems(todo, card);
    document.querySelector('.todos-container').appendChild(cardPad);
  };

  const renderTodos = (project) => {
    const todosContainer = document.querySelector('.todos-container');
    todosContainer.innerHTML = '';
    if (project.getTodos().length < 1) {
      todosContainer.innerHTML = '<h1>Click on + to add a new to-do</h1>';
    }
    project.getTodos().forEach((todo) => {
      renderTodo(todo);
    });
  };

  const newTodoModalListeners = () => {
    const newTodoTitle = document.querySelector('.new-todo-title');
    const newTodoDescription = document.querySelector('.new-todo-desc');
    const newTodoDate = document.querySelector('.new-todo-date');
    const newTodoPriority = document.querySelector('.new-todo-priority');
    const submitTodoButton = document.querySelector('.submit-todo-button');
    const closeTodoModal = document.querySelectorAll('.close-todo-modal');
    submitTodoButton.onclick = () => {
      if (validTitle(newTodoTitle.value) && validDate(newTodoDate.value)) {
        eventAggregator.publish('submittedTodo', {
          title: newTodoTitle.value,
          description: newTodoDescription.value,
          duedate: newTodoDate.value,
          priority: newTodoPriority.value,
        });
        eventAggregator.publish('closedTodoModal');
      } else {
        clearTodoValidationMessages();
        if (!validDate(newTodoDate.value)) showValidationError(newTodoDate, 'Due date cannot be empty or in the past');
        if (!validTitle(newTodoTitle.value)) showValidationError(newTodoTitle, 'Title cannot be empty');
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
      if (validTitle(itemInput.value)) {
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
      document.querySelector('.new-todo-date').value = moment().valueOf();
      eventAggregator.publish('clickedNewTodo');
    };
    newTodoModalListeners();
  };

  return {
    initListeners,
    renderProjects,
    renderTodos,
    displayProjectTitle,
  };
})();

export default displayModule;
