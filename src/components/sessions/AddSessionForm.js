import React, { Component } from 'react';
import CSVReader from 'react-csv-reader'
import { createSession } from '../../store/actions/sessionActions'
import { connect } from 'react-redux'

class AddSessionForm extends Component {
    state = {
        importSuccessful: false,
        totalLaps: false,
        totalLapsArray: false,
        bestTime: false,
        within102: false,
        within105: false,
        within110: false,
        within102List: false,
        within105List: false,
        within110List: false,
    }

    withinCalculations = (timeArray, bestTime, within) => {
        const withinArray = [];

        timeArray.forEach(item => {
            if (item <= bestTime * within) {
                withinArray.push(item);
            }
        });

        return withinArray;
    }

    handleError = (error) => {
        console.log(error);
    }

    handleOnFileLoad = (data, fileInfo) => {
        const timeArray = [];

        data.forEach(item => {

            if (item.laptime === undefined || item.laptime === null || item.laptime === '') return false;
            item.laptime = item.laptime.toLowerCase().replace(/(?![:.])\W/g, '');

            if (item.laptime.length > 3 && item.laptime !== null) {
                const lapTime = item.laptime;
                const lapTimeArray = lapTime.split(':');
                const hoursToSeconds = parseInt(lapTimeArray[0], 10) * 3600;
                const minutesToSeconds = parseInt(lapTimeArray[1], 10) * 60;
                const seconds = parseFloat(lapTimeArray[2]).toFixed(3);
                const lapTimeInSeconds = hoursToSeconds + minutesToSeconds + seconds;

                timeArray.push(lapTimeInSeconds);
            }
        });

        //Get best time
        const bestTime = Math.min(...timeArray)

        //Get laps within 102%, 105%, 110%
        const within102Array = this.withinCalculations(timeArray, bestTime, 1.02);
        const within105Array = this.withinCalculations(timeArray, bestTime, 1.05);
        const within110Array = this.withinCalculations(timeArray, bestTime, 1.1);

        this.setState({
            importSucessful: true,
            totalLaps: timeArray.length,
            bestTime,
            totalLapsArray: timeArray,
            within102: within102Array.length,
            within105: within105Array.length,
            within110: within110Array.length,
            percentageWithin102: parseFloat(within102Array.length / timeArray.length * 100).toFixed(1),
            percentageWithin105: parseFloat(within105Array.length / timeArray.length * 100).toFixed(1),
            percentageWithin110: parseFloat(within110Array.length / timeArray.length * 100).toFixed(1),
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createSession(this.state);
    }  

    render() {

        const importPreview = (
            <div>
                <div>Total laps: {this.state.totalLaps}</div>
                <div>Best lap: {this.state.bestTime}</div>
                <div>Laps within 102%: {this.state.within102} ({this.state.percentageWithin102} %)</div>
                <div>Laps within 105%: {this.state.within105} ({this.state.percentageWithin105} %)</div>
                <div>Laps within 110%: {this.state.within110} ({this.state.percentageWithin110} %)</div>
            </div>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create session</h2>
                <hr />

                <div className="form-row">
                    <div className="form-group col-10 mx-auto mb-0">
                        <input type="text" className="form-control form-control-rounded pl-4 mb-2" id="date" placeholder="Date (YYYY-MM-DD)" />
                        <input type="text" className="form-control form-control-rounded pl-4 mb-2" id="track" placeholder="Track" />
                        <input type="text" className="form-control form-control-rounded pl-4 mb-2" id="configuration" placeholder="Track configuration" />
                        <input type="text" className="form-control form-control-rounded pl-4 mb-2" id="car" placeholder="Car" />
                        <input type="text" className="form-control form-control-rounded pl-4 mb-2" id="setup" placeholder="Setup" />
                    </div>
                </div>

                <hr className="mb-4" />

                <CSVReader
                    cssClass="csv-reader-input"
                    label="Upload exported CSV from Speedhive"
                    onFileLoaded={this.handleOnFileLoad}
                    onError={this.handleError}
                    parserOptions={
                        {
                            header: true,
                            dynamicTyping: true,
                            skipEmptyLines: true,
                            transformHeader: header =>
                                header
                                    .toLowerCase()
                                    .replace(/\W/g, '')
                        }
                    }
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />

                <hr />
                {importPreview}
                <hr />

                <button type="submit" className="btn btn-primary col-12 mt-4">Save</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSession: (session) => dispatch(createSession(session))
    }
}

export default connect(null, mapDispatchToProps)(AddSessionForm)