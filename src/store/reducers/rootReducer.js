import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import sessionReducer from './sessionReducer';
import vehicleReducer from './vehicleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  vehicle: vehicleReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
