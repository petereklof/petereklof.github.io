const createSession = (session) => (dispatch, getState, { getFirebase }) => {
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

export default createSession;
