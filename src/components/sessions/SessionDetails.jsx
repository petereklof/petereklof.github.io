import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  WithinCalculations,
  AvgLapTime,
  BestTime,
  Concistency,
  ToSeconds,
} from '../Utils/LapTimeCalculations';
import Headline from '../layout/Headline';
import MainChart from '../layout/MainChart';
import RunTable from '../layout/RunTable';
import Spinner from '../layout/Spinner';
import QuickStatCard from '../layout/QuickStatCard';

const SessionDetails = ({
  auth, session, profile, track,
}) => {
  // Used to determine if chart should be visible
  const urlParams = new URLSearchParams(window.location.search);
  const showChart = urlParams.get('chart');
  const overrideFirstName = urlParams.get('firstname');
  const overrideLastName = urlParams.get('lastname');

  if (!auth.isLoaded) return false;

  const chartLaps = [];
  if (session && chartLaps.length < 1) {
    const lapTimes = [];
    const avgLapTimes = [];
    const runs = [];
    let totalLaps = null;
    let currentTotalTime = null;

    let lastLap = 0;
    let run = 1;
    let runLapArray = [];
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
      const lapTimeInSeconds = ToSeconds(lapTime);
      const itemLap = parseInt(lap, 10);
      totalLaps = i + 1;
      totTime += lapTimeInSeconds;
      const avgLapTimeInSeconds = AvgLapTime(totTime, totalLaps);

      runLapArray.push(lapTime);
      if (lastLap < itemLap) {
        lastLap = itemLap;
        currentTotalTime = parseInt(item.totaltime.split(':')[1].replace(/(?![:.])\W/g, ''), 10);
      } else {
        const currentRun = [];
        currentRun.isFiveMin = parseInt(currentTotalTime, 10) > 4;
        currentRun.laps = runLapArray;

        runs.push(currentRun);
        currentTotalTime = null;
        runLapArray = [];
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

    let trackName;
    let trackConfigs;
    let trackConfig;
    let trackConfigName;
    let lapRecord;

    if (track) {
      trackName = track ? track.name : '';
      trackConfigs = track.configurations;
      trackConfig = trackConfigs.filter((config) => config.id === session.sessionTrackConfig);
      trackConfigName = trackConfig[0] ? trackConfig[0].name : 'Unknown track';
      lapRecord = trackConfig[0] !== undefined ? trackConfig[0].lapRecord : '';
    }

    const lapRecordLabel = BestTime(lapTimes, 1) <= lapRecord ? <span className="badge badge-soft-success ml-2 mt-n2">Lap record</span> : '';

    const firstName = overrideFirstName || profile.firstName;
    const lastName = overrideLastName || profile.lastName;
    const sessionHeading = `${firstName} ${lastName} - ${trackName} (${trackConfigName})`;
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
                  {new Date(totTime * 1000).toISOString().substr(11, 8)}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-clock text-muted mb-0" />
              </div>
            </QuickStatCard>

          </div>
          {/* End Quick stat cards */}

          <div className="row">

            <RunTable lapTimes={runs} />

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
                                {Concistency(BestTime(lapTimes, 1), AvgLapTime(totTime, totalLaps))}
                                {' '}
                                %
                              </p>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar" role="progressbar" aria-label="Consistency percentage" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" />
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
                            {within102Array.length}
                            {' '}
                            laps (
                            {percentageWithin102}
                            {' '}
                            %)
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Laps within 105% of best time</h4>
                          <p className="card-text small text-muted">
                            {within105Array.length}
                            {' '}
                            laps (
                            {percentageWithin105}
                            {' '}
                            %)
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Laps within 110% of best time</h4>
                          <p className="card-text small text-muted">
                            {within110Array.length}
                            {' '}
                            laps (
                            {percentageWithin110}
                            {' '}
                            %)
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 3 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 3)}
                            {' '}
                            (Avg. laptime:
                            {(BestTime(lapTimes, 3) / 3).toFixed(2)}
                            )
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 5 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 5)}
                            {' '}
                            (Avg. laptime:
                            {(BestTime(lapTimes, 5) / 5).toFixed(2)}
                            )
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col ml-n2">

                          <h4 className="mb-1">Best 10 laps combined</h4>
                          <p className="card-text small text-muted">
                            {BestTime(lapTimes, 10)}
                            {' '}
                            (Avg. laptime:
                            {(BestTime(lapTimes, 10) / 10).toFixed(2)}
                            )
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
      </div>
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
  firestoreConnect([
    { collection: 'sessions' },
    {
      collection: 'tracks',
      doc: 'dl88LtfbtzRrmyGpHkVN',
    },
  ]),
  connect((mapStateToProps)),
)(SessionDetails);
