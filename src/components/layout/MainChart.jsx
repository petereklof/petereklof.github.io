import React, { Component } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import zoom from 'chartjs-plugin-zoom';
import Spinner from './Spinner';

class MainChart extends Component {
  componentDidMount() {
    Chart.plugins.register(zoom);
  }

  render() {
    const { laps, lapTimes, avgLapTimes } = this.props;

    const datasetSettings = {
      fill: false,
      borderWidth: 1,
      // pointBackgroundColor: '#fff',
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    };

    const data = {
      labels: laps,
      datasets: [{
        label: 'Lap time',
        data: lapTimes,
        borderColor: 'rgba(149,149,149,1)',
        pointBorderColor: 'rgba(255,235,104,1)',
        ...datasetSettings,
      }, {
        label: 'Avg. lap time',
        data: avgLapTimes,
        borderColor: 'rgba(255,235,104,1)',
        pointBorderColor: 'rgba(149,149,149,1)',
        borderDash: [10, 5],
        ...datasetSettings,
      }],
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          legend: {
            display: true,
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          scaleOverride: true,
          gridLines: {
            display: false,
          },
        }],
      },
      pan: {
        enabled: true,
        mode: 'x',
        speed: 900000,
        threshold: 1,
      },
      zoom: {
        enabled: true,
        drag: false,
        mode: 'x',
        speed: 9000000,
        sensitivity: -10,
      },
    };

    const chart = lapTimes
      ? <Line data={data} options={options} id="overviewChart" className="chart-canvas chartjs-render-monitor" />
      : <Spinner />;

    return (
      <div className="row">
        <div className="col-12">

          <div className="card">
            <div className="card-body">

              <div className="chart">
                {chart}
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default MainChart;
