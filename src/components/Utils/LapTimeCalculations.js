export const WithinCalculations = (timeArray, bestTime, within) => {
  const withinArray = [];

  timeArray.forEach((item) => {
    if (item <= bestTime * within) {
      withinArray.push(item);
    }
  });

  return withinArray;
};

export const AvgLapTime = (totTime, laps) => {
  return parseFloat(totTime) / (laps);
};

export const BestTime = (lapTimes, laps) => {
  let bestTimes = 0;
  const orderedLapTimes = [...lapTimes].sort();

  const bestTimesCombined = orderedLapTimes.slice(0, (laps)).map(i => {
    bestTimes += i;
    return bestTimes;
  });

  return bestTimesCombined[bestTimesCombined.length - 1].toFixed(3);
};

export const Concistency = (bestTime, avgTime, convert) => {
  const concistency = parseFloat(bestTime / avgTime * 100)
  let concistencyString = '';

  if (convert === true) {
    if (concistency >= 100) {
      const convertedConsistency = concistency - 100;
      concistencyString = `+${(convertedConsistency.toFixed(1))}`;
    } else {
      const convertedConsistency = 100 - concistency;
      concistencyString = `-${(convertedConsistency.toFixed(1))}`;
    }
    return `${ concistencyString } %`;

  } else {
    return parseFloat(bestTime / avgTime * 100).toFixed(1);
  }
};

export const MultiplyLaps = (avgTime, laps) => {
  return avgTime * laps;
};

export const ToSeconds = (lapTime) => {
  lapTime = lapTime.toString();
  const lapTimeArray = lapTime.split(':');
  const hoursToSeconds = parseInt(lapTimeArray[0], 10) * 3600;
  const minutesToSeconds = parseInt(lapTimeArray[1], 10) * 60;
  const seconds = parseFloat(lapTimeArray[2]);
  const lapTimeInSeconds = hoursToSeconds + minutesToSeconds + seconds;

  return lapTimeInSeconds;
};

export const FiveMinuteCalc = (run, runNo) => {
  let runTime = 0;
  let runLaps = 0;
  let firstLap = 0;
  let runLapList = [];
  let fiveMinRuns = []

  for (let i = 0; i <= run.length; i++ ) {
    /* eslint-disable */
    run.slice(i, run.length).forEach((lap) => {
      if (runTime <= 300) {
        runLapList.push(lap);
        runTime += ToSeconds(lap);
        runLaps += 1;
        runLapList.slice(firstLap);
      }
    });

    if (runTime >= 300) {
      const fiveMinRun = [];
      fiveMinRun['laps'] = runLaps;
      fiveMinRun['time'] = runTime;
      fiveMinRun['lapList'] = runLapList;
      fiveMinRun['firstLap'] = i + 1;
      fiveMinRun['runNo'] = runNo;
      fiveMinRuns.push(fiveMinRun);
      runTime = 0;
      runLaps = 0;
      runLapList = [];
    }
  }
  fiveMinRuns.sort(function (a, b) {
    return b['laps'] - a['laps'] || a['time'] - b['time'];
  });

  return fiveMinRuns[0];
};
