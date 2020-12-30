import React, { Component } from 'react'
import ReactModal from 'react-modal'

class SessionItem extends Component {

    state = {
        showModal: false
    }

    constructor() {
        super();

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
        const { item } = this.props
        console.log(item)

        return (
            <li className="list-group-item px-0" onClick={this.handleOpenModal}>
                {item.name}

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Show session"
                    className="modal"
                    overlayClassName="modal-backdrop"
                    closeTimeoutMS={300}
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}
                >
                    fasfsd
                </ReactModal>
            </li>
        );
    }
}

export default SessionItem;