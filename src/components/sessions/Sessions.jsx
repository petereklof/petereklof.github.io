import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import 'babel-polyfill';
import ReactModal from 'react-modal';
import AddSessionForm from './AddSessionForm';
import Headline from '../layout/Headline';
import SessionItem from './SessionItem';
import Spinner from '../layout/Spinner';

class Sessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      sessionsLoaded: false,
      tracksLoaded: false,
      vehiclesLoaded: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { sessions, tracks, vehicles } = this.props;
    if (prevProps.sessions !== sessions) {
      this.setState({ sessionsLoaded: true });
    }

    if (prevProps.tracks !== tracks) {
      this.setState({ tracksLoaded: true });
    }

    if (prevProps.vehicles !== vehicles) {
      this.setState({ vehiclesLoaded: true });
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      showModal,
      sessionsLoaded,
      tracksLoaded,
      vehiclesLoaded,
    } = this.state;

    const {
      auth,
      sessions,
      tracks,
      vehicles,
    } = this.props;

    if (!auth.isLoaded) return false;
    if (!auth.uid) return <Redirect to="/login" />;

    const urlParams = new URLSearchParams(window.location.search);

    const sessionList = sessionsLoaded === true
      && tracksLoaded === true
      && vehiclesLoaded === true
      ? sessions.map((item) => {
        const track = tracks.find(({ id }) => id === item.sessionTrack);
        const trackConfig = track !== undefined
          ? track.configurations.filter((config) => config.id === item.sessionTrackConfig) : null;
        const trackConfigName = trackConfig && trackConfig.length ? trackConfig[0].name : null;
        const vehicle = vehicles.find(({ id }) => id === item.sessionVehicle);
        const sessionItem = (
          <SessionItem
            auth={auth}
            key={item.id}
            item={item}
            track={track}
            trackConfig={trackConfigName}
            vehicle={vehicle}
            comment={item.sessionComment}
          />
        );
        return sessionItem;
      }) : <Spinner />;

    const getPremium = !urlParams.get('limit')
      ? (
        <div className="row">
          <div className="col-12">
            <div className="card card-inactive py-3">
              <div className="card-body text-center">
                <h1>Beta version includes 5 sessions</h1>
                <p className="text-muted">
                  Soon you will be able to register for premium to unlock your full session history!
                </p>
                <button className="btn btn-primary" type="button" onClick={this.handleOpenModal} disabled>
                  Get premium!
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : '';

    return (
      <div className="main-content">
        <Headline preTitle="All your great" title="Sessions">
          <div className="col-2 text-right">
            <button className="btn btn-primary d-inline-block btn-rounded-circle" type="button" onClick={this.handleOpenModal}>+</button>
          </div>
        </Headline>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card" data-toggle="lists" data-lists-values='["name"]'>
                <div className="card-body">

                  <ul className="list-group list-group-lg list-group-flush list my--4">
                    {sessionList}
                  </ul>

                </div>
              </div>

            </div>
          </div>

          {getPremium}

        </div>

        <ReactModal
          isOpen={showModal}
          contentLabel="Lägg till personal"
          className="modal u-modal"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={300}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          <AddSessionForm user={auth.uid} tracks={tracks} closeModal={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.firestore.ordered.sessions,
  tracks: state.firestore.ordered.tracks,
  vehicles: state.firestore.ordered.vehicles,
  auth: state.firebase.auth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect((state) => {
    if (!state.firebase.auth().currentUser) return [];

    const urlParams = new URLSearchParams(window.location.search);
    const limit = urlParams.get('limit') ? urlParams.get('limit') * 1 : 5;

    return [
      {
        collection: 'sessions',
        where: ['authorId', '==', state.firebase.auth().currentUser.uid],
        orderBy: ['sessionDate', 'desc'],
        limit,
      },
      { collection: 'tracks' },
      {
        collection: 'vehicles',
        where: ['owner', '==', state.firebase.auth().currentUser.uid],
      },
    ];
  }),
)(Sessions);
