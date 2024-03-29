const initState = {};

const sessionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_SESSION_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('create session success');
      return state;
    case 'CREATE_SESSION_ERROR':
      // eslint-disable-next-line no-console
      console.log('create session error');
      return state;
    case 'EDIT_SESSION_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('edit session success');
      return state;
    case 'EDIT_SESSION_ERROR':
      // eslint-disable-next-line no-console
      console.log('edit session error');
      return state;
    case 'DELETE_SESSION_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('delete session success');
      return state;
    case 'DELETE_SESSION_ERROR':
      // eslint-disable-next-line no-console
      console.log('delete session error');
      return state;
    default:
      return state;
  }
};

export default sessionReducer;
