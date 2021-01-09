import React from 'react';

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
    return `(Deviation from avgerage lap: ${ concistencyString } %)`;

  } else {
    return parseFloat(bestTime / avgTime * 100).toFixed(1);
  }
};

export const MultiplyLaps = (avgTime, laps) => {
  return avgTime * laps;
};
