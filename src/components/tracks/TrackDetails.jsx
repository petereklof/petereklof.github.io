import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteTrackConfig } from '../../store/actions/trackActions';
import AddTrackConfigForm from './AddTrackConfigForm';
import ConfigurationItem from './ConfigurationItem';
import Headline from '../layout/Headline';
import Spinner from '../layout/Spinner';

class TrackDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      trackConfigs: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteTrackConfig = this.handleDeleteTrackConfig.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { track } = this.props;

    if (prevProps.track !== track) {
      this.setState({ trackConfigs: track.configurations });
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleDeleteTrackConfig(configId) {
    const { trackConfigs } = this.state;
    const { deleteTrackConfigConnect, match } = this.props;
    const { id } = match.params;

    const filteredConfigList = trackConfigs.filter((config) => config.id !== configId);

    deleteTrackConfigConnect(id, filteredConfigList);
  }

  render() {
    const { auth, track } = this.props;
    const { showModal, trackConfigs } = this.state;

    if (!auth.isLoaded) return false;
    if (!auth.uid) return <Redirect to="/login" />;

    if (track) {
      const isAdmin = auth.uid === track.owner;

      const addButton = isAdmin ? (
        <div className="col-2 text-right">
          <button type="button" className="btn btn-primary d-none d-md-inline-block btn-rounded-circle" onClick={this.handleOpenModal}>+</button>
        </div>
      ) : '';

      const noConfigs = isAdmin ? (
        <div className="col-12">
          <div className="card card-inactive py-3">
            <div className="card-body text-center">
              <h1>No track configurations found</h1>
              <p className="text-muted">
                Go ahead and create your first!
              </p>
              <button className="btn btn-primary" type="button" onClick={this.handleOpenModal}>
                Create configuration
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12">
          <div className="card card-inactive pt-3 pb-2">
            <div className="card-body text-center">
              <h1>No track configurations found</h1>
            </div>
          </div>
        </div>
      );

      const configurationList = trackConfigs ? trackConfigs.slice(0).reverse().map((item, i) => {
        const configurationItem = (
          <ConfigurationItem
            key={item.id}
            arrayIndex={i}
            item={item}
            admin={isAdmin}
            deleteConfig={() => this.handleDeleteTrackConfig(item.id)}
          />
        );
        return configurationItem;
      }) : noConfigs;

      return (
        <div className="main-content">
          <Headline preTitle={track.name} title="Track configurations">
            {addButton}
          </Headline>

          <div className="container-fluid">

            <div className="row">
              {configurationList}
            </div>

          </div>
          <ReactModal
            isOpen={showModal}
            contentLabel="Add track configuration"
            className="modal u-modal"
            overlayClassName="modal-backdrop"
            closeTimeoutMS={300}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
          >
            <AddTrackConfigForm user={auth.uid} closeModal={this.handleCloseModal} />
          </ReactModal>
        </div>
      );
    } else {
      return (
        <div className="main-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { tracks } = state.firestore.data;
  const track = tracks ? tracks[id] : null;
  return {
    auth: state.firebase.auth,
    track,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTrackConfigConnect:
    (id, filteredConfigList) => dispatch(deleteTrackConfig(id, filteredConfigList)),
});

export default compose(
  firestoreConnect([
    { collection: 'tracks' },
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(TrackDetails);
