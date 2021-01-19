import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

class SessionItem extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      item,
      track,
      trackConfig,
      vehicle,
      comment
    } = this.props;

    const { showModal } = this.state;
    const trackName = track ? track.name : 'Unknown track';
    const trackConfigName = trackConfig ? (
      <span className="text-muted">
        (
        {trackConfig.name}
        )
      </span>
    ) : '';

    const sessionLapsLength = item.sessionLaps ? `${item.sessionLaps.length} laps` : '';
    const sessionVehicle = vehicle ? `${vehicle.brand} ${vehicle.model}` : '';
    const commentString = comment ? (
        <span className="card-text small text-muted ml-2">
          Comment: {comment}
        </span>
    ) : '';

    return (

      <li className="list-group-item">
        <div className="row align-items-center">

          <div className="col ml-n2">

            <h4 className="mb-1 name">
              {item.sessionDate}
              {'\u00A0'}
              -
              {'\u00A0'}
              {trackName}
              {'\u00A0'}
              {trackConfigName}
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
            <Link to={`/sessions/${item.id}`} className="btn btn-sm btn-white">Details</Link>
          </div>
          <div className="col-auto">

            <div className="dropdown">
              <button type="button" className="btn dropdown-ellipses dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fe fe-more-vertical" />
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="#!" className="dropdown-item">
                  Action
                </a>
                <a href="#!" className="dropdown-item">
                  Another action
                </a>
                <a href="#!" className="dropdown-item">
                  Something else here
                </a>
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
          fasfsd
        </ReactModal>
      </li>
    );
  }
}

export default SessionItem;
