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
      sessions: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { sessions, tracks } = this.props;
    if (prevProps.sessions !== sessions) {
      this.setState({ sessions: true });
    }

    if (prevProps.tracks !== tracks) {
      this.setState({ tracks: true });
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render({ auth } = this.props) {
    if (!auth.isLoaded) return false;
    if (!auth.uid) return <Redirect to="/login" />;

    const { showModal } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    const sessionList = this.state.sessions === true && this.state.tracks === true ? this.props.sessions.map((item) => {
      if (item.authorId === auth.uid) {
        const { tracks } = this.props;
        const track =tracks.find(({ id }) => id === item.sessionTrack);
        const trackConfig = track ? track.configurations[item.sessionTrackConfig] : null;
        const sessionItem = <SessionItem key={item.id} item={item} track={track} trackConfig={trackConfig} />;
        return sessionItem;
      }
      return false;
    }) : <Spinner />;

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
          <AddSessionForm user={auth.uid} tracks={this.props.tracks}/>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.firestore.ordered.sessions,
  tracks: state.firestore.ordered.tracks,
  auth: state.firebase.auth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'sessions' },
    { collection: 'tracks' },
  ]),
)(Sessions);
