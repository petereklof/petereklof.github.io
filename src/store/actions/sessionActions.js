export const createSession = (session) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('sessions').add({
    authorId: session.user,
    createdAt: new Date(),
    sessionDate: session.sessionDate,
    sessionComment: session.sessionComment,
    sessionTrack: session.sessionTrack,
    sessionTrackConfig: session.sessionTrackConfig,
    sessionVehicle: session.sessionVehicle,
    sessionLaps: session.sessionLaps,
  }).then(() => {
    dispatch({ type: 'CREATE_SESSION_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'CREATE_SESSION_ERROR' }, err);
  });
};

export const editSession = (session) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  console.log();

  firestore.collection('sessions').doc(session.sessionId).update({
    authorId: session.user,
    createdAt: new Date(),
    sessionDate: session.sessionDate,
    sessionComment: session.sessionComment,
    sessionTrack: session.sessionTrack,
    sessionTrackConfig: session.sessionTrackConfig,
    sessionVehicle: session.sessionVehicle,
    sessionLaps: session.sessionLaps,
  }).then(() => {
    dispatch({ type: 'EDIT_SESSION_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'EDIT_SESSION_ERROR' }, err);
  });
};

export const deleteSession = (session) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('sessions').doc(session).delete().then(() => {
    dispatch({ type: 'DELETE_SESSION_SUCCESS' });
  })
    .catch((err) => {
      dispatch({ type: 'DELETE_SESSION_ERROR' }, err);
    });
};
