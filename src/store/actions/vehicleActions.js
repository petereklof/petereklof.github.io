export const createVehicle = (vehicle) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('vehicles').add({
    owner: vehicle.user,
    brand: vehicle.vehicleBrand,
    model: vehicle.vehicleModel,
  }).then(() => {
    dispatch({ type: 'CREATE_VEHICLE_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'CREATE_VEHICLE_ERROR' }, err);
  });
};

export const deleteVehicle = (vehicle) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('vehicles').doc(vehicle).delete().then(() => {
    dispatch({ type: 'DELETE_VEHICLE_SUCCESS' });
  })
    .catch((err) => {
      dispatch({ type: 'DELETE_VEHICLE_ERROR' }, err);
    });
};
