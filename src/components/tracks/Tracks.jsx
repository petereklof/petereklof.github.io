import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { firestoreConnect } from 'react-redux-firebase';
import 'babel-polyfill';
import Headline from '../layout/Headline';
import Spinner from '../layout/Spinner';
import TrackItem from './TrackItem';
import AddTrackForm from './AddTrackForm';

class Tracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: false,
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { tracks } = this.props;

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

  render() {
    const { showModal } = this.state;
    const { auth } = this.props;

    if (!auth.isLoaded) return false;
    if (!auth.uid) return <Redirect to="/login" />;

    // eslint-disable-next-line react/destructuring-assignment
    const trackList = this.state.tracks === true
      // eslint-disable-next-line react/destructuring-assignment
      ? this.props.tracks.map((item) => {
        const admin = item.owner === auth.uid;
        const trackItem = <TrackItem key={item.id} item={item} admin={admin} />;
        return trackItem;
      })
      : <Spinner />;

    return (
      <div className="main-content">
        <Headline preTitle="Life is better at the" title="Tracks">
          <div className="col-2 text-right">
            <button type="button" className="btn btn-primary d-none d-md-inline-block btn-rounded-circle" onClick={this.handleOpenModal}>+</button>
          </div>
        </Headline>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card" data-toggle="lists" data-lists-values='["name"]'>
                <div className="card-body">

                  <ul className="list-group list-group-lg list-group-flush list my--4">
                    {trackList}
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>

        <ReactModal
          isOpen={showModal}
          contentLabel="Add track"
          className="modal u-modal"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={300}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          <AddTrackForm user={auth.uid} />
        </ReactModal>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: state.firestore.ordered.tracks,
  auth: state.firebase.auth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'tracks' },
  ]),
)(Tracks);
