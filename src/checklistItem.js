import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const CheckistItem = (checkistItemtitle) => {
  const eventAggregator = getAggregatorInstance();
  let title = checkistItemtitle;
  let status = false;
  const id = Date.now();

  const setTitle = (val) => {
    title = val;
    eventAggregator.publish('checklistItemUpdated', id);
  };
  const getTitle = () => title;
  const toggleStatus = () => {
    status = !status;
    eventAggregator.publish('checklistItemUpdated', id);
  };
  const getStatus = () => status;
  const getId = () => id;

  return {
    setTitle,
    getTitle,
    toggleStatus,
    getStatus,
    getId,
  };
};

export default CheckistItem;