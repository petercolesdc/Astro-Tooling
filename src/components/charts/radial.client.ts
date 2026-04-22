import ApexCharts from "apexcharts";

type RadialChartProps = {
  series: number[];      // e.g. [67]
  labels?: string[];     // e.g. ["Progress"]
  colors?: string[];     // optional override
  height?: number; // 
};

export function mountSemiCircleChart(el: HTMLElement, props: RadialChartProps) {
  const styles = getComputedStyle(document.documentElement);

  const series = props.series ?? [0];

  const colors = props.colors ?? [
    styles.getPropertyValue("--color-purple-100").trim() || "#00E396",
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
      height: props.height ?? 220, // 👈 dynamic height
      sparkline: {
        enabled: false,
      },
    },
    series,
    colors,
    labels: props.labels ?? ["Progress"],

    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90, // 👈 makes it a semi-circle
        hollow: {
          size: "60%",
        },
        track: {
          background: "rgba(255,255,255, 0.2)", // light grey (no gradient)
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: false,
            offsetY: 20,
            fontSize: "14px",
          },
          value: {
            show: false,
            offsetY: -10,
            fontSize: "28px",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid", // 👈 removes gradient
    },
    stroke: {
      lineCap: "round",
    },
  };

  const chart = new ApexCharts(el, options);
  chart.render();

  return chart;
}