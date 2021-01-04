

import React from 'react';

class GetSessionInfo extends Component {
  static withinCalculations(timeArray, bestTime, within) {
    const withinArray = [];

    timeArray.forEach((item) => {
      if (item <= bestTime * within) {
        withinArray.push(item);
      }
    });

    return withinArray;
  }

  constructor() {
    super();

    this.state = {
      user,
      vehicle: null,
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
    };
  }


  const timeArray = [];

  data.forEach((item) => {
    if (
      item.laptime === undefined
      || item.laptime === null
      || item.laptime === ''
      || item.laptime.length < 4
    ) return false;

    const lapTime = item.laptime.toLowerCase().replace(/(?![:.])\W/g, '');
    const lapTimeArray = lapTime.split(':');
    const hoursToSeconds = parseInt(lapTimeArray[0], 10) * 3600;
    const minutesToSeconds = parseInt(lapTimeArray[1], 10) * 60;
    const seconds = parseFloat(lapTimeArray[2]).toFixed(3);
    const lapTimeInSeconds = hoursToSeconds + minutesToSeconds + seconds;

    return timeArray.push(lapTimeInSeconds);
  });

  // Get best time
  const bestTime = Math.min(...timeArray);

  // Get laps within 102%, 105%, 110%
  const within102Array = AddSessionForm.withinCalculations(timeArray, bestTime, 1.02);
  const within105Array = AddSessionForm.withinCalculations(timeArray, bestTime, 1.05);
  const within110Array = AddSessionForm.withinCalculations(timeArray, bestTime, 1.1);

  this.setState({
    importSucessful: true,
    totalLaps: timeArray.length,
    bestTime,
    totalLapsArray: timeArray,
    within102: within102Array.length,
    within105: within105Array.length,
    within110: within110Array.length,
    percentageWithin102: parseFloat((within102Array.length * 100) / timeArray.length).toFixed(1),
    percentageWithin105: parseFloat((within105Array.length * 100) / timeArray.length).toFixed(1),
    percentageWithin110: parseFloat((within110Array.length * 100) / timeArray.length).toFixed(1),
  });

  return (
    <div>

    </div>
  );
}

export default GetSessionInfo;
