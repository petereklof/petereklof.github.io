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
    bestTimes += parseFloat(i);
    return bestTimes;
  });
  return bestTimesCombined[bestTimesCombined.length - 1].toFixed(3);
};

export const WorstTime = (lapTimes) => {
  const orderedLapTimes = [...lapTimes].sort();

  const worstLap = orderedLapTimes[orderedLapTimes.length - 1]

  return worstLap;
};

export const Concistency = (bestTime, avgTime, convert) => {
  let concistencyString = '';

  if (convert === true) {
    if (bestTime > avgTime) {
      const convertedConsistency = parseFloat((1 - (avgTime / bestTime)) * 100);
      concistencyString = `+${(convertedConsistency.toFixed(1))}`;
    } else {
      const convertedConsistency = 100 - parseFloat(bestTime / avgTime * 100);
      concistencyString = `-${(convertedConsistency.toFixed(1))}`;
    }
    return `${ concistencyString } %`;

  } else {
    if (bestTime > avgTime) {
      return parseFloat((1 - (avgTime / bestTime)) * 100).toFixed(1);
    } else {
      return parseFloat(bestTime / avgTime * 100).toFixed(1);
    }
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

export const ToMinutesAndSeconds = (totTime) => {
  const totTimeMinutes = Math.floor(totTime / 60);
  const totTimeSeconds = totTime - totTimeMinutes * 60;
  const totTimeSecondsLeadingZero = (totTimeSeconds.toString().substring(1, 2) === '.' ? '0' + totTimeSeconds.toFixed(3) : totTimeSeconds.toFixed(3));

  return `${totTimeMinutes}:${totTimeSecondsLeadingZero}`;
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

export const IdealRun = (lapTime) => {
  const time = parseFloat(lapTime);
  let run = 0;
  let laps = 0;
  let idealRun = [];

  for (let i = 0; i <= 300; i += time) {
    laps += 1;
    run += time;
  }

  idealRun['laps'] = laps;
  idealRun['run'] = run;

  return idealRun;
};
