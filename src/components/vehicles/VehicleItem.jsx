import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteVehicle } from '../../store/actions/vehicleActions';

class VehicleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDropdown: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleDeleteVehicle = this.handleDeleteVehicle.bind(this);
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

  handleDeleteVehicle() {
    const { deleteVehicleConnect, item } = this.props;
    const { id } = item;
    deleteVehicleConnect(id);
  }

  render() {
    const { item } = this.props;
    const { showModal, showDropdown } = this.state;

    const ddClasses = classNames({
      'dropdown-menu dropdown-menu-right': true,
      show: showDropdown,
    });

    return (
      <li className="list-group-item">
        <div className="row align-items-center">

          <div className="col ml-n2">

            <h4 className="mb-1 name">
              <Link to={`/vehicles/${item.id}`}>
                {item.brand}
                {'\u00A0'}
                {item.model}
              </Link>
            </h4>

          </div>
          <div className="col-auto">

            <div className="dropdown">
              <button type="button" className="btn dropdown-ellipses dropdown-toggle" onClick={this.handleToggleDropdown} aria-haspopup="true" aria-expanded="false">
                <i className="fe fe-more-vertical" />
              </button>
              <div className={ddClasses}>
                <Link to={`/vehicles/${item.id}`} className="dropdown-item">View vehicle</Link>
                <button className="dropdown-item" type="button" onClick={this.handleOpenModal}>Edit vehicle</button>
                <button className="dropdown-item" type="button" onClick={this.handleDeleteVehicle}>Remove vehicle</button>
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
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteVehicleConnect: (vehicle) => dispatch(deleteVehicle(vehicle)),
});

export default connect(null, mapDispatchToProps)(VehicleItem);
