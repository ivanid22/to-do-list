const CheckistItem = (checkistItemtitle) => {
  let title = checkistItemtitle;
  let status = false;
  const id = Date.now();
  return {
    title,
    status,
    id
  }
}
export default CheckistItem