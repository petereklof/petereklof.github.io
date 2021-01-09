import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  WithinCalculations,
  AvgLapTime,
  BestTime,
  Concistency,
} from '../Utils/LapTimeCalculations';
import Headline from '../layout/Headline';
import MainChart from '../layout/MainChart';
import Spinner from '../layout/Spinner';
import QuickStatCard from '../layout/QuickStatCard';

const SessionDetails = ({ auth, session, profile, track }) => {
  // Used to determine if chart should be visible
  const urlParams = new URLSearchParams(window.location.search);
  const showChart = urlParams.get('chart');

  if (!auth.isLoaded) return false;
  if (!auth.uid) return <Redirect to="/login" />;

  if (session) {
    const chartLaps = [];
    const lapTimes = [];
    const avgLapTimes = [];
    let totalLaps = null;

    let lastLap = 0;
    let run = 1;
    let totTime = 0;

    session.sessionLaps.forEach((item, i) => {
      if (
        item.laptime === undefined
        || item.laptime === null
        || item.laptime === ''
        || item.laptime === false
        || item.laptime.length < 4
      ) return false;


      const lapTime = item.laptime.toLowerCase().replace(/(?![:.])\W/g, '');
      const rawLap = item.lap.toString();
      const lap = rawLap.toLowerCase().replace(/(?![:.])\W/g, '');
      const lapTimeArray = lapTime.split(':');
      const hoursToSeconds = parseInt(lapTimeArray[0], 10) * 3600;
      const minutesToSeconds = parseInt(lapTimeArray[1], 10) * 60;
      const seconds = parseFloat(lapTimeArray[2]);
      const lapTimeInSeconds = hoursToSeconds + minutesToSeconds + seconds;
      const itemLap = lap;
      totalLaps = i + 1;
      totTime += lapTimeInSeconds;
      const avgLapTimeInSeconds = AvgLapTime(totTime, totalLaps);

      if (lastLap < itemLap) {
        lastLap = itemLap;
      } else {
        lastLap = 0;
        run += 1;
      }

      chartLaps.push(i);
      lapTimes.push(lapTimeInSeconds);
      avgLapTimes.push(avgLapTimeInSeconds.toFixed(3));
    });

    // // Get laps within 102%, 105%, 110%
    const within102Array = WithinCalculations(lapTimes, BestTime(lapTimes, 1), 1.02);
    const within105Array = WithinCalculations(lapTimes, BestTime(lapTimes, 1), 1.05);
    const within110Array = WithinCalculations(lapTimes, BestTime(lapTimes, 1), 1.1);
    const percentageWithin102 = parseFloat((within102Array.length * 100) / totalLaps).toFixed(1);
    const percentageWithin105 = parseFloat((within105Array.length * 100) / totalLaps).toFixed(1);
    const percentageWithin110 = parseFloat((within110Array.length * 100) / totalLaps).toFixed(1);

    const trackName = track ? track.name : '';
    const trackConfig = track ? track.configurations[3].name : '';
    const lapRecord = track ? track.configurations[3].lapRecord : '';

    const lapRecordLabel = BestTime(lapTimes, 1) <= lapRecord ? <span className="badge badge-soft-success ml-2 mt-n2">Lap record</span> : '';

    const sessionHeading = `${profile.firstName} ${profile.lastName} - ${trackName} (${trackConfig})`;
    const mainChart = showChart === 'true' ? <MainChart laps={chartLaps} lapTimes={lapTimes} avgLapTimes={avgLapTimes} /> : '';

    return (
      <div className="main-content">
        <Headline preTitle={session.sessionDate} title={sessionHeading} />

        <div className="container-fluid">

          {mainChart}

          {/* Quick stat cards */}
          <div className="row">

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Registered laps</h6>
                <span className="h2 mb-0">
                  {totalLaps}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-clipboard text-muted mb-0" />
              </div>
            </QuickStatCard>

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Best lap</h6>
                <span className="h2 mb-0">
                  {BestTime(lapTimes, 1)}
                </span>
                {lapRecordLabel}
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-award text-muted mb-0" />
              </div>
            </QuickStatCard>

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Runs</h6>
                <span className="h2 mb-0">
                  {run}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-circle text-muted mb-0" />
              </div>
            </QuickStatCard>

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Total driving time</h6>
                <span className="h2 mb-0">
                  {new Date(totTime  * 1000).toISOString().substr(11, 8)}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-clock text-muted mb-0" />
              </div>
            </QuickStatCard>

          </div>
          {/* End Quick stat cards */}

          <div className="row">
            <div className="col-12 col-xl-8">

              <div className="card">
                <div className="card-header">
                  <h4 className="card-header-title">Performance</h4>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table table-sm table-nowrap card-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Schedule</th>
                        <th>Hours Billed</th>
                        <th>Completion</th>
                        <th>Effective Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>Dianna Smiley</span>
                        </td>
                        <td>
                          <span className="text-success">●</span>
                          {' '}
                          On Schedule
                        </td>
                        <td>
                          271
                        </td>
                        <td>
                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <span className="mr-2">55%</span>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          $55.25%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Ab Hadley</span>
                        </td>
                        <td>
                          <span className="text-warning">●</span>
                          {' '}
                          Delayed
                        </td>
                        <td>
                          44
                        </td>
                        <td>
                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <span className="mr-2">25%</span>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          $122.52%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Adolfo Hess</span>
                        </td>
                        <td>
                          <span className="text-success">●</span>
                          {' '}
                          On Schedule
                        </td>
                        <td>
                          271
                        </td>
                        <td>
                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <span className="mr-2">55%</span>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          $55.25%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Daniela Dewitt</span>
                        </td>
                        <td>
                          <span className="text-warning">●</span>
                          {' '}
                          Delayed
                        </td>
                        <td>
                          44
                        </td>
                        <td>
                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <span className="mr-2">25%</span>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          $122.52%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Miyah Myles</span>
                        </td>
                        <td>
                          <span className="text-success">●</span>
                          {' '}
                          On Schedule
                        </td>
                        <td>
                          271
                        </td>
                        <td>
                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <span className="mr-2">55%</span>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-secondary" label="Kuk" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          $55.25%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
            <div className="col-12 col-xl-4">

              <div className="card">

                <div className="card-header">
                  <h4 className="card-header-title">Session analysis</h4>
                </div>

                <div className="card-body">

                  <div className="list-group list-group-flush my-n3">

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best laptime</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 1)}
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Average laptime</h4>
                          <p className="card-text small text-muted">
                            {AvgLapTime(totTime, totalLaps).toFixed(3)}
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">
                            <a href="#!">Concistency</a>
                          </h4>

                          <div className="row align-items-center no-gutters">
                            <div className="col-auto">
                              <p className="card-text small pr-3 text-muted">
                                {Concistency(BestTime(lapTimes, 1), AvgLapTime(totTime, totalLaps))} %
                              </p>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Laps within 102% of best time</h4>
                          <p className="card-text small text-muted">
                            {within102Array.length} laps ({percentageWithin102} %)
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Laps within 105% of best time</h4>
                          <p className="card-text small text-muted">
                            {within105Array.length} laps ({percentageWithin105} %)
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Laps within 110% of best time</h4>
                          <p className="card-text small text-muted">
                            {within110Array.length} laps ({percentageWithin110} %)
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 3 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 3)}  {Concistency(BestTime(lapTimes, 3), AvgLapTime(totTime, totalLaps) * 3, true)}
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 5 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 5)} {Concistency(BestTime(lapTimes, 5), AvgLapTime(totTime, totalLaps)*5, true)}
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 10 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 10)} {Concistency(BestTime(lapTimes, 10), AvgLapTime(totTime, totalLaps) * 10, true)}
                          </p>

                        </div>
                      </div>
                    </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      </div >
    );
  }
return (
  <div className="main-content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { sessions, tracks } = state.firestore.data;
  const session = sessions ? sessions[id] : null;
  const track = tracks ? tracks[session.sessionTrack] : null;

  return {
    session,
    track,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default compose(
  firestoreConnect(props => {
    return [
      { collection: 'sessions' },
      {
        collection: 'tracks',
        doc: 'dl88LtfbtzRrmyGpHkVN',
      }
    ]
  }),
  connect((mapStateToProps)),
)(SessionDetails);
