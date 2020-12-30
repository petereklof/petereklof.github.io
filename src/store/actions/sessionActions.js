export const createSession = (session) => {
    return (dispatch, getState, { getFirebase }) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection('sessions').add({
            ...session,
            authorFirstName: 'Net',
            authorLastName: 'Ninja',
            authorId: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_SESSION_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_SESSION_ERROR' }, err);
        });
    }
};