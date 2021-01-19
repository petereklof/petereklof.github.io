import React, { Component } from 'react';
import {
  FiveMinuteCalc,
  Concistency,
  ToSeconds,
  ToMinutesAndSeconds,
  BestTime,
  AvgLapTime,
  IdealRun,
  WorstTime,
} from '../Utils/LapTimeCalculations';
import Spinner from '../layout/Spinner';

class RunTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runToShow: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { lapTimes } = this.props;
    const fiveMinRuns = [];

    let i = 0;
    lapTimes.forEach((item) => {
      i += 1;
      if (item.isFiveMin !== true) {
        return false;
      }
      const fiveMinRun = [];
      fiveMinRun['runNo'] = i;
      fiveMinRun['laps'] = item.laps;
      fiveMinRuns.push(fiveMinRun);
    });

    // Calculate best five min runs
    if (fiveMinRuns.length) {
      let bestFiveMinRuns = [];

      fiveMinRuns.forEach((item) => {
        bestFiveMinRuns.push(FiveMinuteCalc(item.laps, item.runNo));
      });

      bestFiveMinRuns.sort(function (a, b) {
        return b['laps'] - a['laps'] || a['time'] - b['time'];
      });

      this.setState({ bestFiveMinRuns });
    }
  }

  handleChange(e) {
    const runToShow = e.target.value;
    this.setState({ runToShow });
  }

  render() {
    const { bestFiveMinRuns, runToShow } = this.state;
    let lapList = null;
    let runOptions = null;

    if (bestFiveMinRuns) {
      let lapNo = parseInt(bestFiveMinRuns[runToShow].firstLap, 10);
      let totTime = 0;
      let elapsed = 0;
      const time = bestFiveMinRuns[runToShow].time;
      const laps = bestFiveMinRuns[runToShow].laps;
      const avgLap = time / laps;

      lapList = bestFiveMinRuns[runToShow].lapList.map((lap) => {
        const currentLap = lapNo;
        lapNo += 1;
        totTime += ToSeconds(lap);
        const totTimeMinutes = Math.floor(totTime / 60);
        const totTimeSeconds = totTime - totTimeMinutes * 60;
        const totTimeSecondsLeadingZero = (totTimeSeconds.toString().substring(1, 2) === '.' ? '0' + totTimeSeconds.toFixed(3) : totTimeSeconds.toFixed(3));
        const lapTime = lap.substring(2);
        const diff = Concistency(ToSeconds(lap), avgLap, true);
        const className = diff.substring(0, 1) === '+' ? 'text-danger' : 'text-success';
        const percentageOfTotal = (ToSeconds(lap) / time * 100);
        elapsed += percentageOfTotal;

        return (
          <tr key={currentLap}>
            <td>
              <span>{currentLap}</span>
            </td>
            <td>
              {lapTime}
            </td>
            <td>
              0{totTimeMinutes}:{totTimeSecondsLeadingZero}
            </td>
            <td>
              <span className={className}>{diff}</span>
            </td>
            <td>
              <div className="row align-items-center no-gutters">
                <div className="col-auto">
                  <span className="mr-2">{percentageOfTotal.toFixed(1)}%</span>
                </div>
                <div className="col">
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-secondary" role="progressbar" style={{ width: elapsed.toFixed(1) + '%' }} aria-valuenow={elapsed.toFixed(1)} aria-valuemin="0" aria-valuemax="100" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      });

      let i = 0;
      runOptions = bestFiveMinRuns.map((item) => {
        const currentI = i;
        const totTimeMinutes = Math.floor(item.time / 60);
        const totTimeSeconds = item.time - totTimeMinutes * 60;
        const totTimeSecondsLeadingZero = (totTimeSeconds.toString().substring(1, 2) === '.' ? '0' + totTimeSeconds.toFixed(3) : totTimeSeconds.toFixed(3));
        i += 1;
        return (
          <option key={item.runNo} value={currentI}>
            {item.laps} laps in {totTimeMinutes}:{totTimeSecondsLeadingZero} (Run {item.runNo} )
          </option>
        )
      });
    } else {
      return (
        <Spinner />
      )
    };

    const lapListInSeconds = bestFiveMinRuns[runToShow].lapList.map((lap) => {
      return ToSeconds(lap);
    });


    return (
      <div className="col-12 col-xl-8">

        <div className="card">
          <div className="card-header">
            <h4 className="card-header-title">5-minute runs</h4>
            <select className="form-control form-control-rounded custom-select px-4 col-4" id="runPicker" onChange={this.handleChange}>
              {runOptions}
            </select>
          </div>

          <div className="row no-gutters border-top border-bottom" >
            <div className="col-3 py-4 text-center">
              <h6 className="text-uppercase text-muted">Laps</h6>
              <h2 className="mb-0">{bestFiveMinRuns[runToShow].laps}</h2>
            </div>
            <div className="col-3 py-4 text-center border-left">
              <h6 className="text-uppercase text-muted">Time</h6>
              <h2 className="mb-0">{ToMinutesAndSeconds( bestFiveMinRuns[runToShow].time )}</h2>
            </div>
            <div className="col-3 py-4 text-center border-left">
              <h6 className="text-uppercase text-muted">Best lap</h6>
              <h2 className="mb-0">{BestTime(lapListInSeconds, 1) }</h2>
            </div>
            <div className="col-3 py-4 text-center border-left">
              <h6 className="text-uppercase text-muted">Avg. lap</h6>
              <h2 className="mb-0">{AvgLapTime(bestFiveMinRuns[runToShow].time, bestFiveMinRuns[runToShow].laps ).toFixed(3) }</h2>
            </div>
            <div className="col-6 py-4 text-center border-left border-top">
              <h6 className="text-uppercase text-muted">Ideal run - based on best lap</h6>
              <h2 className="mb-0">{IdealRun(BestTime(lapListInSeconds, 1)).laps} laps in {ToMinutesAndSeconds(IdealRun(BestTime(lapListInSeconds, 1)).run)}</h2>
            </div>
            <div className="col-3 py-4 text-center border-left border-top">
              <h6 className="text-uppercase text-muted">Worst lap</h6>
              <h2 className="mb-0">{WorstTime(lapListInSeconds)}</h2>
            </div>
            <div className="col-3 py-4 text-center border-left border-top">
              <h6 className="text-uppercase text-muted">Concistency</h6>
              <div className="row align-items-center no-gutters mx-4">
                <div className="col-auto">
                  <p className="card-text small pr-3 text-muted">
                    {Concistency(BestTime(lapListInSeconds, 1), AvgLapTime(bestFiveMinRuns[runToShow].time, bestFiveMinRuns[runToShow].laps))} %
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

          <div className="table-responsive mb-0">
            <table className="table table-sm table-nowrap card-table">
              <thead>
                <tr>
                  <th>Lap</th>
                  <th>Laptime</th>
                  <th>Total time</th>
                  <th>Deviation</th>
                  <th>% of total</th>
                </tr>
              </thead>
              <tbody>
                {lapList}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }
}

export default RunTable;
