import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createVehicle } from '../../store/actions/vehicleActions';

class AddVehicleForm extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = { user };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createVehicleConnect, closeModal } = this.props;
    const form = e.target;

    this.setState({
      vehicleBrand: form.querySelector('#brand').value,
      vehicleModel: form.querySelector('#model').value,
    }, () => {
      createVehicleConnect(this.state);
    });

    closeModal();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create vehicle</h2>
        <hr />

        <div className="form-row">
          <div className="form-group col-12 mx-auto mb-0">

            <input type="text" id="brand" className="form-control form-control-rounded py-3 px-4 mb-4" rows="5" placeholder="Brand" />
            <input type="text" id="model" className="form-control form-control-rounded py-3 px-4 mb-4" rows="5" placeholder="Model" />

          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary col-12 mt-4">Save</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createVehicleConnect: (vehicle) => dispatch(createVehicle(vehicle)),
});

export default connect(null, mapDispatchToProps)(AddVehicleForm);
