import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaskInput from 'react-maskinput';
import { createTrackConfig } from '../../store/actions/trackActions';

class AddTrackConfigForm extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = { user };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createTrackConfigConnect, closeModal } = this.props;
    const form = e.target;
    const { pathname } = window.location;
    const trackId = pathname.split('/')[2];

    this.setState({
      configName: form.querySelector('#configName').value,
      recordLaps: form.querySelector('#recordLaps').value,
      recordTime: form.querySelector('#recordTime').value,
      lapRecord: form.querySelector('#lapRecord').value,
      lowestValidLaptime: form.querySelector('#lowestValidLaptime').value,
      marshallingTime: form.querySelector('#marshallingTime').value,
      fuckUpTime: form.querySelector('#fuckUpTime').value,
    }, () => {
      createTrackConfigConnect(this.state, trackId);
    });
    closeModal();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create track configuration</h2>
        <hr />

        <div className="form-row">
          <div className="form-group col-12 mx-auto mb-0">

            <input type="text" id="configName" className="form-control form-control-rounded py-3 px-4 mb-4" rows="5" placeholder="Configuration name" />

            <hr className="mb-4" />
            <h3 className="text-muted h4 py-2">5-min record</h3>
            <div className="row no-gutters align-middle d-flex align-items-center mb-4">
              <div className="col-2">
                <input type="text" id="recordLaps" className="form-control form-control-rounded col text-center py-3 px-2" rows="5" placeholder="0" />
              </div>
              <div className="col-auto px-2">laps in</div>
              <div className="col">
                <MaskInput
                  id="recordTime"
                  className="form-control form-control-rounded col py-3 px-4"
                  alwaysShowMask
                  maskChar="0"
                  mask="00:00.000"
                  size={20}
                />
              </div>
            </div>

            <hr className="mb-4" />
            <h3 className="text-muted h4 py-2">Lap record</h3>
            <MaskInput
              id="lapRecord"
              className="form-control form-control-rounded col py-3 px-4"
              alwaysShowMask
              maskChar="0"
              mask="00:00.000"
              size={20}
            />

            <hr className="mb-4" />
            <h3 className="text-muted h4 py-2">Lowest valid laptime</h3>
            <MaskInput
              id="lowestValidLaptime"
              className="form-control form-control-rounded col py-3 px-4"
              alwaysShowMask
              maskChar="0"
              mask="00:00.000"
              size={20}
            />
            <small className="text-muted">Laptimes lower than this value will be deleted.</small>

            <hr className="mb-4" />
            <h3 className="text-muted h4 py-2">
              Marshalling time
              {'\u00A0'}
              <small>(seconds)</small>
            </h3>
            <MaskInput
              id="marshallingTime"
              className="form-control form-control-rounded col py-3 px-4"
              alwaysShowMask
              maskChar="0"
              mask="00:00.000"
              size={20}
            />
            <small className="text-muted">The duration of an average marshalling on this track configuration.</small>

            <hr className="mb-4" />
            <h3 className="text-muted h4 py-2">
              Fuck up time
              {'\u00A0'}
              <small>(seconds)</small>
            </h3>
            <input type="text" id="fuckUpTime" className="form-control form-control-rounded py-3 px-4 mb-4" rows="5" placeholder="Configuration name" />
            <small className="text-muted">Number of seconds above average laptime to be considered a fuck up that needs marshalling.</small>
          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary col-12 mt-4">Save</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createTrackConfigConnect: (trackConfig, trackId) => dispatch(createTrackConfig(trackConfig, trackId)),
});

export default connect(null, mapDispatchToProps)(AddTrackConfigForm);
