import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { firestoreConnect } from 'react-redux-firebase';
import 'babel-polyfill';
import Headline from '../layout/Headline';
import Spinner from '../layout/Spinner';
import VehicleItem from './VehicleItem';
import AddVehicleForm from './AddVehicleForm';

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: false,
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { vehicles } = this.props;

    if (prevProps.vehicles !== vehicles) {
      this.setState({ vehicles: true });
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
    const vehicleList = this.state.vehicles === true
      // eslint-disable-next-line react/destructuring-assignment
      ? this.props.vehicles.map((item) => {
        if (item.owner === auth.uid) {
          const vehicleItem = <VehicleItem key={item.id} item={item} />;
          return vehicleItem;
        }
        return false;
      })
      : <Spinner />;

    return (
      <div className="main-content">
        <Headline preTitle="All your shiny" title="Vehicles">
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
                    {vehicleList}
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>

        <ReactModal
          isOpen={showModal}
          contentLabel="Add vehicle"
          className="modal u-modal"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={300}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          <AddVehicleForm user={auth.uid} closeModal={this.handleCloseModal} />
        </ReactModal>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.firestore.ordered.vehicles,
  auth: state.firebase.auth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'vehicles' },
  ]),
)(Vehicles);
