import uuidv4 from "uuid/v4";

export const createTrack = (track) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('tracks').add({
    owner: track.user,
    name: track.trackName,
  }).then(() => {
    dispatch({ type: 'CREATE_TRACK_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'CREATE_TRACK_ERROR' }, err);
  });
};

export const deleteTrack = (track) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  firestore.collection('tracks').doc(track).delete().then(() => {
    dispatch({ type: 'DELETE_TRACK_SUCCESS' });
  })
    .catch((err) => {
      dispatch({ type: 'DELETE_TRACK_ERROR' }, err);
    });
};

export const createTrackConfig = (trackConfig, trackId) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  const config = {
    id: uuidv4(),
    name: trackConfig.configName,
    lapRecord: trackConfig.lapRecord,
    fiveMinRecord: {
      recordLaps: trackConfig.recordLaps,
      recordTime: trackConfig.recordTime,
    },
    lowestValidLaptime: trackConfig.lowestValidLaptime,
    marshallingTime: trackConfig.marshallingTime,
    fuckUpTime: trackConfig.fuckUpTime,
  }
  firestore.collection('tracks').doc(trackId).update({
    configurations: firebase.firestore.FieldValue.arrayUnion(config)
  }).then(() => {
    dispatch({ type: 'CREATE_TRACK_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'CREATE_TRACK_ERROR' }, err);
  });
};

export const deleteTrackConfig = (trackId, configList) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();

  console.log(trackId);

  firestore.collection('tracks').doc(trackId).update({
    configurations: configList,
  }).then(() => {
    dispatch({ type: 'DELETE_TRACK_SUCCESS' });
  })
    .catch((err) => {
      dispatch({ type: 'DELETE_TRACK_ERROR' }, err);
    });
};
