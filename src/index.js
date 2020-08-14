import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Project from './project';
import Todo from './todo';
import ChecklistItem from './checklistItem';

const todo1 = Todo('Tarea1');
const project1 = Project('Proyecto1');
project1.todos.push(todo1);
project1.addTodo(todo1);

const events = getAggregatorInstance();

events.subscribe('removeTodo', (data) => {
  console.log('removeTodo');
  console.log(data);
});

console.log(project1);

console.log(project1.removeTodo(todo1.id))

console.log(project1);
const body = document.querySelector('body'); 
body.innerHTML = 'Hello wolrd';