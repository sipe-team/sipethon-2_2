'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@nextui-org/react';
import {
  CandlestickData,
  CandlestickSeriesPartialOptions,
  ChartOptions, ColorType, createChart, DeepPartial, IChartApi, ISeriesApi, SeriesMarker, Time,
} from 'lightweight-charts';

import { generateData } from '@/utils';

import styles from './index.module.scss';

const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    textColor: 'black',
    background: { type: ColorType.Solid, color: 'white' },
  },
  height: 200,
};

const seriesOptions: CandlestickSeriesPartialOptions = {
  upColor: '#26a69a',
  downColor: '#ef5350',
  borderVisible: false,
  wickUpColor: '#26a69a',
  wickDownColor: '#ef5350',
};

const intervals = ['1D', '1W', '1M', '1Y'];

function SampleChart3() {
  const data = generateData(2500, 20, 1000);

  const [currentInterval, setCurrentInterval] = useState<string>(intervals[0]);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartState, setChartState] = useState<IChartApi>();
  const [seriesState, setSeriesState] = useState<ISeriesApi<'Candlestick'>>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef?.current || '', {
      ...chartOptions,
      width: chartContainerRef?.current?.clientWidth,
    });

    const series = chart.addCandlestickSeries(seriesOptions);

    const markers: SeriesMarker<Time>[] = [
      {
        time: data.initialData[20].time,
        position: 'aboveBar',
        color: '#f68410',
        shape: 'circle',
        text: 'D',
      },
      {
        time: data.initialData[25].time,
        position: 'belowBar',
        color: '#2196F3',
        shape: 'arrowUp',
        text: `Buy @ ${Math.floor(data.initialData[25].high - 2)}`,
      },
      {
        time: data.initialData[40].time,
        position: 'aboveBar',
        color: '#e91e63',
        shape: 'arrowDown',
        text: `Sell @ ${Math.floor(data.initialData[40].high + 2)}`,
      },
    ];

    chart.timeScale().fitContent();
    series.setData(data.initialData);
    series.setMarkers(markers);
    chart.timeScale().fitContent();
    chart.timeScale().scrollToPosition(5, true);

    setSeriesState(series);
    setChartState(chart);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, []);

  useEffect(() => {
    function* getNextRealtimeUpdate(realtimeData: CandlestickData[]) {
      // eslint-disable-next-line no-restricted-syntax
      for (const dataPoint of realtimeData) {
        yield dataPoint;
      }
      return null;
    }

    const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

    const intervalID = setInterval(() => {
      const update = streamingDataProvider.next();
      if (update.done) {
        clearInterval(intervalID);
        return;
      }
      seriesState?.update(update.value);
    }, 100);

    return () => clearInterval(intervalID);
  }, [seriesState]);

  useEffect(() => {
    if (chartState && seriesState) {
      seriesState.setData(data.initialData);
      chartState.timeScale().fitContent();
    }
  }, [currentInterval, chartState, seriesState]);

  return (
    <div>
      {intervals.map((interval) => (
        <Button
          key={interval}
          color={currentInterval === interval ? 'primary' : 'default'}
          type="button"
          onClick={() => setCurrentInterval(interval)}
        >
          {interval}
        </Button>
      ))}
      <div
        ref={chartContainerRef}
        className={styles.chartContainer}
      />
      <Button
        color="success"
        type="button"
        onClick={() => chartState?.timeScale().scrollToRealTime()}
      >
        Go to realtime
      </Button>
    </div>
  );
}

export default SampleChart3;
