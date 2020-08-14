const todo = (todotitle) => {
  let title = todotitle;
  let description = "";
  let dueDate = -1;
  let priority = 0;
  let status = false;
  const checklists = [];
  let notes = "";
  const id = Date.now();
  return {
    title,
    description,
    dueDate,
    priority,
    status,
    checklists,
    notes,
    id
  }
}
export default todo
