import {
  createContext,
  forwardRef, MutableRefObject, PropsWithChildren, useCallback, useEffect,
  useImperativeHandle, useLayoutEffect, useRef, useState,
} from 'react';

import {
  ChartOptions,
  createChart, DeepPartial, IChartApi, ISeriesApi, SeriesType,
} from 'lightweight-charts';

export type ChartRef = {
  isRemoved?: boolean;
  api: () => IChartApi;
  free: (series?: ISeriesApi<SeriesType>) => void;
  apiRef?: MutableRefObject<any>;
};

export const ChartContext = createContext<ChartRef | null>(null);

type Props = {
  children: React.ReactNode;
  container: HTMLElement;
  chartOptions: DeepPartial<ChartOptions>;
};

const ChartContainer = forwardRef(({
  children, container, chartOptions,
}: Props, ref) => {
  const apiRef = useRef<any>(null);

  const chartApiRef = useRef<ChartRef>({
    isRemoved: false,
    apiRef,
    api: () => {
      if (!apiRef?.current) {
        apiRef.current = createChart(container, {
          ...chartOptions,
          layout: chartOptions.layout,
          width: container?.clientWidth,
          height: 300,
        });
        apiRef.current.timeScale().fitContent();
      }

      return apiRef?.current;
    },
    free: (series) => {
      if (apiRef.current && series) {
        apiRef.current?.removeSeries(series);
      }
    },
  });

  useLayoutEffect(() => {
    const currentRef = chartApiRef.current;
    const chart = currentRef.api();

    const handleResize = () => {
      chart.applyOptions({
        ...chartOptions,
        width: container?.clientWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chartApiRef.current.isRemoved = true;
    };
  }, []);

  useLayoutEffect(() => {
    const currentRef = chartApiRef.current;
    currentRef.api();
  }, []);

  useLayoutEffect(() => {
    const currentRef = chartApiRef.current;
    currentRef.api().applyOptions(chartOptions);
  }, []);

  useImperativeHandle(ref, () => chartApiRef.current.api(), []);

  useEffect(() => {
    const currentRef = chartApiRef.current;
    currentRef.api().applyOptions({ layout: chartOptions.layout });
  }, [chartOptions.layout]);

  return (
    <ChartContext.Provider value={chartApiRef.current}>
      {children}
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = 'ChartContainer';

function Chart({
  chartOptions, children,
}: PropsWithChildren<{ chartOptions: DeepPartial<ChartOptions> }>) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const handleRef = useCallback((ref: HTMLDivElement | null) => setContainer(ref), []);

  return (
    <div ref={handleRef}>
      {container && (
        <ChartContainer
          chartOptions={chartOptions}
          container={container}
        >
          {children}
        </ChartContainer>
      )}
    </div>
  );
}

export default Chart;
