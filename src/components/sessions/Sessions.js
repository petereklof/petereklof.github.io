import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import 'babel-polyfill';
import ReactModal from 'react-modal'
import AddSessionForm from './AddSessionForm'
import Headline from '../layout/Headline'
import SessionItem from './SessionItem'

class Sessions extends Component {
    state = {
        showModal: false,
        sessions: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sessions !== this.props.sessions) {
            this.setState({ sessions: true })
        }
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
        const { auth } = this.props
        if (!auth.isLoaded) return false
        if (!auth.uid) return <Redirect to='/login' /> 
        console.log(this.props);
        return (
            <div className="main-content">
                <Headline preTitle='All your great' title='Sessions'>
                    <div className="col-2 text-right">
                        <button className="btn btn-primary d-none d-md-inline-block btn-rounded-circle" onClick={this.handleOpenModal}>+</button>
                    </div>
                </Headline>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Lägg till personal"
                    className="modal"
                    overlayClassName="modal-backdrop"
                    closeTimeoutMS={300}
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}
                >
                    <AddSessionForm></AddSessionForm>
                </ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sessions: state.firestore.ordered.sessions,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'sessions' }
    ])
)(Sessions)