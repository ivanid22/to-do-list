import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';

const CheckistItem = (checkistItemtitle) => {
  const eventAggregator = getAggregatorInstance();
  let title = checkistItemtitle;
  let status = false;
  let id = Date.now();

  const setTitle = (val) => {
    title = val;
    eventAggregator.publish('checklistItemUpdated', id);
  };

  const setId = (newId) => {
    id = newId;
  };

  const getTitle = () => title;
  const toggleStatus = () => {
    status = !status;
    eventAggregator.publish('checklistItemUpdated', id);
  };

  const setStatus = (val) => {
    status = val;
  };

  const getStatus = () => status;
  const getId = () => id;

  const serialize = () => ({ title, status, id });

  return {
    setTitle,
    getTitle,
    toggleStatus,
    getStatus,
    getId,
    serialize,
    setStatus,
    setId,
  };
};

export default CheckistItem;