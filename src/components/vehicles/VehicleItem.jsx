import React, { Component } from 'react';
import ReactModal from 'react-modal';

class VehicleItem extends Component {
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
    const { item } = this.props;
    const { showModal } = this.state;

    return (
      <li className="list-group-item px-0">
        {item.brand}
        {item.model}
        <button type="button" className="btn btn-primary float-right" onClick={this.handleOpenModal}>Edit</button>

        <ReactModal
          isOpen={showModal}
          contentLabel="Lägg till personal"
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

export default VehicleItem;
