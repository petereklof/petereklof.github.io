import React, { Component } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class ConfigurationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDropdown: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleToggleDropdown() {
    const { showDropdown } = this.state;

    this.setState({ showDropdown: !showDropdown });
  }

  render() {
    const { item, admin, deleteConfig } = this.props;
    const { showModal, showDropdown } = this.state;

    const ddClasses = classNames({
      'dropdown-menu dropdown-menu-right': true,
      show: showDropdown,
    });

    const dropdown = admin ? (
      <div className="dropdown card-dropdown">
        <button type="button" className="btn dropdown-ellipses dropdown-toggle p-0" onClick={this.handleToggleDropdown} aria-haspopup="true" aria-expanded="false">
          <i className="fe fe-more-vertical" />
        </button>
        <div className={ddClasses}>
          <Link to={`/tracks/${item.id}`} className="dropdown-item">View track</Link>
          <button className="dropdown-item" type="button" onClick={this.handleOpenModal}>Edit track</button>
          <button className="dropdown-item" type="button" onClick={deleteConfig}>Remove track</button>
        </div>
      </div>
    ) : '';

    return (
      <div className="col-12 col-lg-6 col-xl-4">

        <div className="card">

          {dropdown}

          <div className="card-body">

            <h2 className="card-title text-center">{item.name}</h2>

            <p className="small text-center text-muted mb-3">Created 21 January 2021</p>

            <div className="row no-gutters border-top border-bottom">

              <div className="col-4 py-4 text-center">
                <h6 className="text-uppercase text-muted">Lap Record</h6>
                <h2 className="h3 mb-0">{item.lapRecord}</h2>
              </div>

              <div className="col-8 py-4 text-center border-left">
                <h6 className="text-uppercase text-muted">Best 5-min run</h6>
                <h2 className="h3 mb-0">XX laps in X:XX.XXX</h2>
              </div>

            </div>

            <div className="list-group list-group-flush">

              <div className="list-group-item px-0">
                <div className="row align-items-center">
                  <div className="col">
                    <small>Min. valid laptime</small>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">{item.lowestValidLaptime}</small>
                  </div>
                </div>
              </div>

              <div className="list-group-item px-0">
                <div className="row align-items-center">
                  <div className="col">
                    <small>Marshalling time</small>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">{item.marshallingTime}</small>
                  </div>
                </div>
              </div>

              <div className="list-group-item px-0">
                <div className="row align-items-center">
                  <div className="col">
                    <small>Registred sessions</small>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">39</small>
                  </div>
                </div>
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
          {/* To do: Add form */}
          Coming soon
        </ReactModal>
      </div>
    );
  }
}

export default ConfigurationItem;
