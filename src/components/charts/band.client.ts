import ApexCharts from "apexcharts";

type RadialChartProps = {
  series: number[];              // e.g. [67]
  labels?: string[];             // e.g. ["Progress"]
  colors?: string[];             // optional override
};

export function mountBarChart(el: HTMLElement, props: RadialChartProps) {
  const styles = getComputedStyle(document.documentElement);

  const series = props.series ?? [0];

  const colors = [
    styles.getPropertyValue("--color-aqua").trim(),
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
      foreColor: "#red",
      sparkline: {
        enabled: true
      },
      height: 180,
    },
    series,
    colors,
    labels: ["Customers"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        track: {
          background: "rgba(255,255,255,0.2)",
        },
        dataLabels: {
          name: {
            offsetY: 0,
            show: false,
            color: styles.getPropertyValue("--color-aqua").trim(),
            fontSize: "13px"
          },
          value: {
            color: "#ffffff",
            fontSize: "36px",
            offsetY: 12,
            show: false
          }
        },
      },
    },
  };

  const chart = new ApexCharts(el, options);
  chart.render();

  return chart;
}