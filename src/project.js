const project = (projectname) => {
  let name = projectname;
  const todos = [];
  const id = Date.now();
  return {
    name,
    todos,
    id
  }
}

export default project