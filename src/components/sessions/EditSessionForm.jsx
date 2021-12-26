import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CSVReader from '../../assets/libs/react-csv-reader';
import { editSession } from '../../store/actions/sessionActions';
import CompleteDatePicker from '../Utils/CompleteDatePicker';

class EditSessionForm extends Component {
  static handleError() {
    document.querySelector('.u-csv-reader').classList.remove('success');
    document.querySelector('.u-csv-reader').classList.add('danger');
    document.querySelector('.u-csv-reader label').innerHTML = 'The file could not be uploaded or parsed';
  }

  constructor(props) {
    super(props);

    const { user, session } = this.props;

    this.state = {
      user,
      vehiclesLoaded: false,
      date: session.sessionDate,
      sessionTrack: session.sessionTrack,
      sessionTrackConfig: session.sessionTrackConfig,
      sessionLaps: session.sessionLaps,
      sessionVehicle: session.sessionVehicle,
    };

    this.handleOnFileLoad = this.handleOnFileLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTrackConfigs = this.handleTrackConfigs.bind(this);
    this.trackConfigs = this.trackConfigs.bind(this);
  }

  componentDidMount() {
    const { sessionTrack } = this.state;

    this.trackConfigs(sessionTrack);
  }

  handleTrackConfigs(e) {
    this.trackConfigs(e.target.value);
  }

  handleOnFileLoad(data, fileInfo) {
    if (fileInfo.type !== 'text/csv') {
      EditSessionForm.handleError();
      return false;
    }

    document.querySelector('.u-csv-reader').classList.remove('danger');
    document.querySelector('.u-csv-reader').classList.add('success');
    document.querySelector('.u-csv-reader label').innerHTML = 'Your file was uploaded and parsed!';

    const lapTimeArray = [];
    data.forEach((item) => {
      if (
        item.laptime === undefined
        || item.laptime === null
        || item.laptime === ''
        || item.laptime.length < 4
      ) {
        return false;
      }
      lapTimeArray.push(item);

      return this.setState({ sessionLaps: lapTimeArray });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { session, editSessionConnect, closeModal } = this.props;
    const { sessionLaps } = this.state;
    const form = e.target;

    if (sessionLaps === undefined) {
      return false;
    }

    this.setState({
      sessionId: session.id,
      sessionDate: form.querySelector('#date').value,
      sessionComment: form.querySelector('#comment').value,
      sessionTrack: form.querySelector('#track').value,
      sessionTrackConfig: form.querySelector('#trackConfig').value,
      sessionVehicle: form.querySelector('#vehicle').value,
    }, () => {
      editSessionConnect(this.state);
    });

    closeModal();
  }

  trackConfigs(track) {
    const { tracks } = this.props;
    const choosenTrack = tracks.find(({ id }) => id === track);
    const trackConfigOptions = choosenTrack !== undefined ? choosenTrack.configurations : null;
    const defaultConfig = track;

    this.setState({ trackConfigOptions, defaultConfig });
  }

  render() {
    const {
      user,
      date,
      sessionTrack,
      trackConfigOptions,
      sessionVehicle,
    } = this.state;
    const { vehicles, tracks, session } = this.props;

    if (document.getElementById('vehicle')) {
      if (vehicles.filter(function (e) { return e.id === sessionVehicle; }).length > 0) {
        document.getElementById('vehicle').value = sessionVehicle;
      }
    }

    const vehicleOptions = vehicles
      ? vehicles.map((item) => {
        if (item.owner === user) {
          return (
            <option key={item.id} value={item.id}>
              {item.brand}
              {'\u00A0'}
              {item.model}
            </option>
          );
        }
        return false;
      })
      : '';

    const trackOptions = tracks
      ? tracks.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))
      : '';

    let trackConfigs = '';
    const trackConfigSelect = document.getElementById('trackConfig');
    if (trackConfigOptions) {
      trackConfigSelect.disabled = false;
      trackConfigSelect.value = session.sessionTrackConfig;

      trackConfigs = trackConfigOptions.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
    } else if (!trackConfigOptions && trackConfigSelect) {
      trackConfigSelect.disabled = true;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Edit session</h2>
        <hr />

        <div className="form-row">
          <div className="form-group col-12 mx-auto mb-0">
            <h3 className="text-muted h4 py-2">Session info</h3>
            <CompleteDatePicker pickedDate={date} />
            <CSVReader
              cssClass="u-csv-reader form-control mb-3"
              onFileLoaded={this.handleOnFileLoad}
              onError={EditSessionForm.handleError}
              label="Upload a Speedhive export file (.csv)"
              parserOptions={
                {
                  header: true,
                  dynamicTyping: true,
                  skipEmptyLines: true,
                  transformHeader: (header) => header.toLowerCase().replace(/\W/g, ''),
                }
              }
              inputId="csv"
            />
            <textarea id="comment" className="form-control py-3 px-4 mb-4" rows="5" placeholder="Comments about the session..." defaultValue={session.sessionComment} />

            <hr className="mb-4" />

            <h3 className="text-muted h4 py-2">The track</h3>
            <select className="form-control form-control-rounded custom-select px-4 mb-2" id="track" defaultValue={sessionTrack} onChange={this.handleTrackConfigs}>
              <option>Choose track</option>
              {trackOptions}
            </select>
            <select className="form-control form-control-rounded custom-select px-4 mb-2" id="trackConfig" disabled>
              <option>Choose track configuration</option>
              {trackConfigs}
            </select>
            <hr className="mb-4" />

            <h3 className="text-muted h4 py-2">Your vehicle</h3>
            <select className="form-control form-control-rounded custom-select px-4 mb-2" id="vehicle">
              <option>Choose vehicle</option>
              {vehicleOptions}
            </select>
            {/* <input type="text" className="form-control" id="setup" placeholder="Setup" /> */}
          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary col-12 mt-4">Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.firestore.ordered.vehicles,
  tracks: state.firestore.ordered.tracks,
});

const mapDispatchToProps = (dispatch) => ({
  editSessionConnect: (session) => dispatch(editSession(session)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => {
    if (!state.firebase.auth().currentUser) return [];

    return [
      {
        collection: 'vehicles',
        where: ['owner', '==', state.firebase.auth().currentUser.uid],
        orderBy: ['brand', 'desc'],
      },
      {
        collection: 'tracks',
      },
    ];
  }),
)(EditSessionForm);
