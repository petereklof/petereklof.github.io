const initState = {};

const trackReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TRACK_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('create track success');
      return state;
    case 'CREATE_TRACK_ERROR':
      // eslint-disable-next-line no-console
      console.log('create track error');
      return state;
    case 'DELETE_TRACK_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('delete track success');
      return state;
    case 'DELETE_TRACK_ERROR':
      // eslint-disable-next-line no-console
      console.log('delete track error');
      return state;
    default:
      return state;
  }
};

export default trackReducer;
