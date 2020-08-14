import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const Project = (projectname) => {
  const eventsAggregator = getAggregatorInstance();
  let name = projectname;

  const todos = [];
  const id = Date.now();

  const getName = () => name;
  const setName = (val) => { name = val; };
  const getTodos = () => todos;
  const getId = () => id;

  const addTodo = (todo) => {
    todos.push(todo);
    eventsAggregator.publish('addedTodo', todo);
  };

  const getTodo = (id) => {
    const foundTodo = todos.find(todo => todo.getId() === id);
    return foundTodo;
  };

  const removeTodo = (id) => {
    const removeTodo = todos.find(todo => todo.getId() === id);
    if (removeTodo) {
      todos.splice(todos.indexOf(removeTodo), 1);
      eventsAggregator.publish('removedTodo', ...removeTodo);
      return true;
    }
    return false;
  };

  return {
    getName,
    setName,
    getTodos,
    getId,
    addTodo,
    removeTodo,
    getTodo,
  };
};

export default Project;