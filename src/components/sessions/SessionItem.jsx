import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import EditSessionForm from './EditSessionForm';
import { deleteSession } from '../../store/actions/sessionActions';

class SessionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDropdown: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleDeleteSession = this.handleDeleteSession.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true, showDropdown: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleToggleDropdown() {
    const { showDropdown } = this.state;

    this.setState({ showDropdown: !showDropdown });
  }

  handleDeleteSession() {
    const { deleteSessionConnect, item } = this.props;
    const { id } = item;
    deleteSessionConnect(id);
  }

  render() {
    const {
      auth,
      item,
      track,
      trackConfig,
      vehicle,
      comment,
    } = this.props;

    const { showModal, showDropdown } = this.state;
    const trackName = track ? track.name : 'Unknown track';
    const trackConfigName = trackConfig ? (
      <span className="text-muted">
        (
        {trackConfig}
        )
      </span>
    ) : '';

    const sessionLapsLength = item.sessionLaps ? `${item.sessionLaps.length} laps` : '';
    const sessionVehicle = vehicle ? `${vehicle.brand} ${vehicle.model}` : '';
    const commentString = comment ? (
      <span className="card-text small text-muted ml-2">
        Comment:
        {'\u00A0'}
        {comment}
      </span>
    ) : '';

    const ddClasses = classNames({
      'dropdown-menu dropdown-menu-right': true,
      show: showDropdown,
    });

    return (

      <li className="list-group-item">
        <div className="row align-items-center">

          <div className="col ml-n2">

            <h4 className="mb-1 name">
              <Link to={`/sessions/${item.id}`}>
                {item.sessionDate}
                {'\u00A0'}
                -
                {'\u00A0'}
                {trackName}
                {'\u00A0'}
                {trackConfigName}
              </Link>
            </h4>

            <p className="card-text small text-muted mb-1">
              {sessionVehicle}
            </p>

            <p className="card-text small">
              {sessionLapsLength}
              {'\u00A0'}
              {commentString}
            </p>

          </div>
          <div className="col-auto">

            <div className="dropdown">
              <button type="button" className="btn dropdown-ellipses dropdown-toggle" onClick={this.handleToggleDropdown} aria-haspopup="true" aria-expanded="false">
                <i className="fe fe-more-vertical" />
              </button>
              <div className={ddClasses}>
                <Link to={`/sessions/${item.id}`} className="dropdown-item">View session</Link>
                <button className="dropdown-item" type="button" onClick={this.handleOpenModal}>Edit session</button>
                <button className="dropdown-item" type="button" onClick={this.handleDeleteSession}>Remove session</button>
              </div>
            </div>

          </div>
        </div>

        <ReactModal
          isOpen={showModal}
          contentLabel="Show session"
          className="modal"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={300}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          <EditSessionForm user={auth.uid} session={item} trackName={trackName} closeModal={this.handleCloseModal} />
        </ReactModal>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteSessionConnect: (session) => dispatch(deleteSession(session)),
});

export default connect(null, mapDispatchToProps)(SessionItem);
