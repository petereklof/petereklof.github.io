const initState = {};

const vehicleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_VEHICLE_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('create vehicle success');
      return state;
    case 'CREATE_VEHICLE_ERROR':
      // eslint-disable-next-line no-console
      console.log('create vehicle error');
      return state;
    case 'DELETE_VEHICLE_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('delete vehicle success');
      return state;
    case 'DELETE_VEHICLE_ERROR':
      // eslint-disable-next-line no-console
      console.log('delete vehicle error');
      return state;
    default:
      return state;
  }
};

export default vehicleReducer;
