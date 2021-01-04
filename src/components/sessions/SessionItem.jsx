import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
    const { item, track, trackConfig } = this.props;
    const { showModal } = this.state;

    const trackName = track ? track['name'] : 'Unknown track';
    const trackConfigName = trackConfig ? trackConfig['name'] : '';

    return (

      <li className="list-group-item">
        <div className="row align-items-center">

          <div className="col ml-n2">

            <h4 className="mb-1 name">
              {item.sessionDate} - {trackName}
            </h4>

            <p className="card-text small text-muted mb-1">
              Track configuration: {trackConfigName}
            </p>

            <p className="card-text small text-muted">

            </p>

          </div>
          <div className="col-auto">
            <a href="#!" className="btn btn-sm btn-white d-none d-md-inline-block">Edit</a>
          </div>
          <div className="col-auto">

            <div className="dropdown">
              <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fe fe-more-vertical"></i>
              </a>
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
