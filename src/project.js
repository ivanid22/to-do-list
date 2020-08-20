import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const Project = (projectname) => {
  const eventsAggregator = getAggregatorInstance();
  let name = projectname;

  const todos = [];
  let id = Date.now();

  const getName = () => name;
  const setName = (val) => { name = val; };
  const getTodos = () => todos;
  const getId = () => id;

  const setId = (newId) => {
    id = newId;
  };

  const addTodo = (todo) => {
    todos.push(todo);
    //eventsAggregator.publish('addedTodo', todo);
  };

  const getTodo = (id) => {
    const foundTodo = todos.find(todo => todo.getId() === id);
    return foundTodo;
  };

  const removeTodo = (id) => {
    const removeTodo = todos.find(todo => todo.getId() === id);
    if (removeTodo) {
      todos.splice(todos.indexOf(removeTodo), 1);
      // eventsAggregator.publish('removedTodo', ...removeTodo);
      return true;
    }
    return false;
  };

  const serialize = () => {
    const serializedTodos = [];
    todos.forEach(todo => {
      serializedTodos.push(todo.serialize());
    });
    return {
      name,
      id,
      todos: serializedTodos,
    };
  };

  return {
    getName,
    setName,
    getTodos,
    getId,
    addTodo,
    removeTodo,
    getTodo,
    serialize,
    setId,
  };
};

export default Project;