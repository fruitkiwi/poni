import PoniAppDispatcher from '../dispatcher/PoniAppDispatcher';

export default {
  
  loadFilter: function(filter) {
    PoniAppDispatcher.dispatch({
      type: 'filter-poni',
      filter: filter
    });
  }
  
};