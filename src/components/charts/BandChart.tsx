import { useEffect, useRef } from 'react';
import { mountBarChart } from './band.client';

interface BandChartProps {
  series: any;
  labels: any;
}

export default function BandChart({ series, labels }: BandChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mountBarChart(ref.current, { series, labels });
    }
  }, [series, labels]);

  return <div ref={ref}></div>;
}
