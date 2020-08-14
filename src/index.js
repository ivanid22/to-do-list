import project from './project'
import todo from './todo'
import checklistItem from './checklistItem'

const todo1 = todo('Tarea1')
const project1 = project('Proyecto1')
project1.todos.push(todo1); 

console.log(project1);
const body = document.querySelector('body'); 
body.innerHTML = 'Hello wolrd';