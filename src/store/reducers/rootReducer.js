//import authReducer from './authReducer'
//import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object