import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const Project = (projectname) => {
  const eventsAggregator = getAggregatorInstance();
  let name = projectname;

  const todos = [];
  const id = Date.now();

  const addTodo = (todo) => {
    todos.push(todo);
    eventsAggregator.publish('addedTodo', todo);
  };

  const getTodo = (id) => {
    const foundTodo = todos.filter(todo => todo.getId() === id);
    return foundTodo;
  };

  const setName = (val) => {
    name = val;
  };

  const removeTodo = (id) => {
    const removeTodo = todos.filter(todo => todo.getId() === id);
    if (removeTodo) {
      todos.splice(todos.indexOf(removeTodo), 1);
      eventsAggregator.publish('removedTodo', ...removeTodo);
      return true;
    }
    return false;
  };

  return {
    name,
    todos,
    id,
    addTodo,
    removeTodo,
    setName,
    getTodo,
  };
};

export default Project;