const Todo = (todotitle) => {
  const eventsAggregator = getAggregatorInstance();
  
  let title = todotitle;
  let description = "";
  let dueDate = -1;
  let priority = 0;
  let status = false;
  const checklists = [];
  let notes = '';
  const id = Date.now();

  const getTitle = () => title;
  const setTitle = val => { title = val; };

  const getDescription = () => description;
  const setDescription = val => { description = val; };

  const getDueDate = () => dueDate;
  const setDueDate = val => { dueDate = val; };

  const getPriority = () => priority;
  const setPriority = val => { priority = val; };

  const getStatus = () => status;
  const setStatus = val => { status = val; };

  const addCheckListItem = (checklistItem) => {
    checklists.push(checklistItem);
    eventsAggregator.publish('addedChecklist', checklistItem);
  };

  const getCheckListItem = (id) => {
    const foundCheckListItem = checklists.filter(checklist => checklist.getId() === id);
    return foundCheckListItem;
  };

  const removeCheckListItem = (id) => {
    const removeCheckList = checklists.filter(checklist => checklist.getId() === id);
    if (removeCheckList) {
      checklists.splice(checklists.indexOf(removeCheckList), 1);
      eventsAggregator.publish('removedChecklist', ...removeCheckList);
      return true;
    }
    return false;
  };

  const getAllChecklistItems = () => checklists;

  const getNotes = () => notes;
  const setNotes = val => { notes = val; };

  const getId = () => id;
 
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
  };
};

export default Todo;
