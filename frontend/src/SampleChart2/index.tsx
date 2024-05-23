'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { AreaData } from 'lightweight-charts';

import Chart from '@/SampleChartContainer';
import Series from '@/Series';

type Props = {
  initialData: AreaData[],
  initialData2: AreaData[],
  colors?: {
    backgroundColor?: string,
    lineColor?: string,
    textColor?: string,
  },
};

function SampleChart2({
  initialData,
  initialData2,
  colors: {
    backgroundColor = 'white',
    lineColor = '#2962FF',
    textColor = 'black',
  } = {},
}: Props) {
  const currentDate = new Date(initialData[initialData.length - 1].time as string);

  const [chartLayoutOptions, setChartLayoutOptions] = useState({});
  // The following variables illustrate how a series could be updated.
  const series1 = useRef<any>(null);
  const series2 = useRef<any>(null);
  const [started, setStarted] = useState(false);
  const [isSecondSeriesActive, setIsSecondSeriesActive] = useState(false);

  // The purpose of this effect is purely to show how a series could
  // be updated using the `reference` passed to the `Series` component.
  useEffect(() => {
    if (series1.current === null) {
      return;
    }

    let intervalId: NodeJS.Timeout;

    if (started) {
      intervalId = setInterval(() => {
        currentDate.setDate(currentDate.getDate() + 1);
        const next = {
          time: currentDate.toISOString().slice(0, 10),
          value: 53 - 2 * Math.random(),
        };
        series1.current.update(next);
        if (series2.current) {
          series2.current?.update({
            ...next,
            value: 43 - 2 * Math.random(),
          });
        }
      }, 1000);
    }

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [started]);

  useEffect(() => {
    setChartLayoutOptions({
      background: {
        color: backgroundColor,
      },
      textColor,
    });
  }, [backgroundColor, textColor]);

  return (
    <>
      <button type="button" onClick={() => setStarted((current) => !current)}>
        {started ? 'Stop updating' : 'Start updating series'}
      </button>
      <button type="button" onClick={() => setIsSecondSeriesActive((current) => !current)}>
        {isSecondSeriesActive ? 'Remove second series' : 'Add second series'}
      </button>
      <Chart chartOptions={{
        layout: chartLayoutOptions,
      }}
      >
        <Series
          ref={series1}
          type="line"
          data={initialData}
          color={lineColor}
        />
        {isSecondSeriesActive && (
          <Series
            ref={series2}
            type="area"
            data={initialData2}
            color={lineColor}
          />
        )}
      </Chart>
    </>
  );
}

export default SampleChart2;
