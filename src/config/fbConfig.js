import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const config = {
  apiKey: 'AIzaSyBIQpnGV4y6wKM2Srpf0vkc8kwjUHG6z-U',
  authDomain: 'pacemakr-24b54.firebaseapp.com',
  databaseURL: 'https://pacemakr-24b54.firebaseio.com',
  projectId: 'pacemakr-24b54',
  storageBucket: 'pacemakr-24b54.appspot.com',
  messagingSenderId: '567783069933',
  appId: '1:567783069933:web:bcb740d715233cbf4a94e4',
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
