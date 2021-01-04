export const logIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password,
  ).then(() => {
    dispatch({ type: 'LOGIN_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'LOGIN_ERROR', err });
  });
};

export const logOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().signOut().then(() => {
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  });
};

export const signUp = (newUser) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password,
  ).then((resp) => (
    firestore.collection('users').doc(resp.user.uid).set({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      initials: newUser.firstName[0] + newUser.lastName[0],
    })
  )).then(() => {
    dispatch({ type: 'SIGNUP_SUCCESS' });
  })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
};

export const forgotPassword = (email) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().sendPasswordResetEmail(email.email)
    .then(() => {
      dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'FORGOT_PASSWORD_ERROR', err });
    });
};
