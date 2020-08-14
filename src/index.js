import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Project from './project';
import Todo from './todo';
import ChecklistItem from './checklistItem';

const todo1 = Todo('Tarea1');
const project1 = Project('Proyecto1');
project1.addTodo(todo1);

const eventAggregator = getAggregatorInstance();

eventAggregator.subscribe('addedChecklist', (item) => {
  console.log('added item');
  console.log(item);
});

eventAggregator.subscribe('todoUpdated', (data) => {
  console.log(project1.getTodo(data));
});

setTimeout(() => {
  todo1.setTitle('new title');
  todo1.addCheckListItem(ChecklistItem('item'));
}, 3000);