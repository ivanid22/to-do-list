import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const Todo = (todotitle) => {
  const eventsAggregator = getAggregatorInstance();

  let title = todotitle;
  let description = '';
  let dueDate = -1;
  let priority = 0;
  let status = false;
  const checklists = [];
  let notes = '';
  let id = Date.now();

  const setId = (newId) => {
    id = newId;
  };

  const getTitle = () => title;
  const setTitle = val => {
    title = val;
    eventsAggregator.publish('todoUpdated', id);
  };

  const getDescription = () => description;
  const setDescription = val => {
    description = val;
    eventsAggregator.publish('todoUpdated', id);
  };

  const getDueDate = () => dueDate;
  const setDueDate = val => {
    dueDate = val;
    eventsAggregator.publish('todoUpdated', id);
  };

  const getPriority = () => priority;
  const setPriority = val => {
    priority = val;
    eventsAggregator.publish('todoUpdated', id);
  };

  const getStatus = () => status;
  const setStatus = val => {
    status = val;
    eventsAggregator.publish('todoUpdated', id);
  };

  const addCheckListItem = (checklistItem) => {
    checklists.push(checklistItem);
    eventsAggregator.publish('addedChecklist', checklistItem);
  };

  const getCheckListItem = (id) => {
    const foundCheckListItem = checklists.find(checklist => checklist.getId() === id);
    return foundCheckListItem;
  };

  const removeCheckListItem = (id) => {
    const removeCheckList = checklists.find(checklist => checklist.getId() === id);
    if (removeCheckList) {
      checklists.splice(checklists.indexOf(removeCheckList), 1);
      eventsAggregator.publish('removedChecklist', ...removeCheckList);
      return true;
    }
    return false;
  };

  const getPriorityString = () => {
    console.log(typeof (priority));
    switch (priority) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Critical';
      default:
        return 'Undefined';
    }
  };

  const getAllChecklistItems = () => checklists;

  const getNotes = () => notes;
  const setNotes = val => { notes = val; };

  const getId = () => id;

  const serialize = () => {
    const serializedChecklistItems = [];
    checklists.forEach(checklistItem => {
      serializedChecklistItems.push(checklistItem.serialize());
    });
    return {
      title,
      id,
      description,
      dueDate,
      priority,
      status,
      checklists: serializedChecklistItems,
    };
  };

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getStatus,
    setStatus,
    addCheckListItem,
    getCheckListItem,
    removeCheckListItem,
    getAllChecklistItems,
    getNotes,
    setNotes,
    getId,
    getPriorityString,
    setId,
    serialize,
  };
};

export default Todo;
