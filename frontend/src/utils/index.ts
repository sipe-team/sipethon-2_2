/* eslint-disable no-plusplus */
import {
  CandlestickData, LineData, Time, WhitespaceData,
} from 'lightweight-charts';

let randomFactor = 25 + Math.random() * 25;
export const samplePoint = (i: number) => i
        * (0.5
            + Math.sin(i / 1) * 0.2
            + Math.sin(i / 2) * 0.4
            + Math.sin(i / randomFactor) * 0.8
            + Math.sin(i / 50) * 0.5)
    + 200
    + i * 2;

export function generateData(
  numberOfCandles = 500,
  updatesPerCandle = 5,
  startAt = 100,
) {
  const createCandle = (val: number, time: Time): CandlestickData => ({
    time,
    open: val,
    high: val,
    low: val,
    close: val,
  });

  const updateCandle = (candle: CandlestickData | undefined, val: number): CandlestickData => ({
    time: candle?.time || 0 as Time,
    close: val,
    open: candle?.open || 0,
    low: Math.min(candle?.low || 0, val),
    high: Math.max(candle?.high || 0, val),
  });

  randomFactor = 25 + Math.random() * 25;
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  const numberOfPoints = numberOfCandles * updatesPerCandle;
  const initialData = [];
  const realtimeUpdates = [];
  let lastCandle;
  let previousValue = samplePoint(-1);

  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const time = date.getTime() / 1000 as Time;
    let value = samplePoint(i);
    const diff = (value - previousValue) * Math.random();
    value = previousValue + diff;
    previousValue = value;
    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time);
      lastCandle = candle;
      if (i >= startAt) {
        realtimeUpdates.push(candle);
      }
    } else {
      const newCandle = updateCandle(lastCandle, value);
      lastCandle = newCandle;
      if (i >= startAt) {
        realtimeUpdates.push(newCandle);
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle);
      }
    }
  }

  return {
    initialData,
    realtimeUpdates,
  };
}

export function calculateMovingAverageSeriesData(
  candleData: CandlestickData[],
  maLength: number,
): WhitespaceData<Time>[] | LineData<Time>[] {
  const maData = [];

  for (let i = 0; i < candleData.length; i++) {
    if (i < maLength) {
      maData.push({ time: candleData[i].time });
    } else {
      let sum = 0;
      for (let j = 0; j < maLength; j++) {
        sum += candleData[i - j].close;
      }
      const maValue = sum / maLength;
      maData.push({ time: candleData[i].time, value: maValue });
    }
  }

  return maData;
}
