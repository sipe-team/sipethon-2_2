'use client';

import { useEffect, useRef, useState } from 'react';

import {
  CandlestickData,
  CandlestickSeriesPartialOptions,
  ChartOptions, ColorType, createChart, DeepPartial, IChartApi, ISeriesApi,
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

function SampleChart3() {
  const data = generateData(2500, 20, 1000);

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

    chart.timeScale().fitContent();
    series.setData(data.initialData);
    chart.timeScale().fitContent();
    chart.timeScale().scrollToPosition(5, false);

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

  return (
    <div>
      <div
        ref={chartContainerRef}
        className={styles.chartContainer}
      />
      <button type="button" onClick={() => chartState?.timeScale().scrollToRealTime()}>Go to realtime</button>
    </div>
  );
}

export default SampleChart3;
