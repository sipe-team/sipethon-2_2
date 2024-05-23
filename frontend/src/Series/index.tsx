import {
  forwardRef, PropsWithChildren,
  useContext, useImperativeHandle, useLayoutEffect, useRef,
} from 'react';

import {
  AreaData,
} from 'lightweight-charts';

import { ChartContext, ChartRef } from '@/SampleChartContainer';

type Props = {
  type: 'line' | 'area';
  data: AreaData[];
  color?: string;
};

const Series = forwardRef(({
  children, data, type, color,
}: PropsWithChildren<Props>, ref) => {
  const parent = useContext(ChartContext);
  const apiRef = useRef<any>(null);
  const context = useRef<ChartRef>({
    apiRef: parent?.apiRef,
    api: () => {
      if (parent && !parent?.apiRef?.current) {
        apiRef.current = type === 'line'
          ? parent.api().addLineSeries({ color })
          : parent.api().addAreaSeries({ lineColor: color });
        apiRef.current.setData(data);
      }

      return apiRef?.current;
    },
    free: () => {
      // check if parent component was removed already
      if (parent?.apiRef?.current && !parent.isRemoved) {
        // remove only current series
        parent.free(parent?.apiRef?.current);
      }
    },
  });

  useLayoutEffect(() => {
    const currentRef = context.current;
    currentRef.api();

    return () => currentRef.free();
  }, []);

  useLayoutEffect(() => {
    const currentRef = context.current;
    currentRef.api().applyOptions({});
  });

  useImperativeHandle(ref, () => context.current.api(), []);

  return (
    <ChartContext.Provider value={context.current}>
      {children}
    </ChartContext.Provider>
  );
});

Series.displayName = 'Series';

export default Series;
