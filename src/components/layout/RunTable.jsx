import React, { Component } from 'react';
import {
  FiveMinuteCalc,
  Concistency,
  ToSeconds,
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
            {item.laps} laps in {totTimeMinutes}:{totTimeSecondsLeadingZero.toFixed(3)} (Run {item.runNo} )
          </option>
        )
      });
    } else {
      return(
        <Spinner />
      )
    };

    return (
      <div className="col-12 col-xl-8">

        <div className="card">
          <div className="card-header">
            <h4 className="card-header-title">5-minute runs</h4>
            <select className="form-control form-control-rounded custom-select px-4" id="runPicker" onChange={this.handleChange}>
              {runOptions}
            </select>
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
