import ApexCharts from "apexcharts";

export function mountDonutChart(el: HTMLElement, props: any) {
  const styles = getComputedStyle(document.documentElement);

  const colors = [
    styles.getPropertyValue("--color-blue").trim(),
    styles.getPropertyValue("--color-yellow").trim(),
    styles.getPropertyValue("--color-orange").trim(),
    styles.getPropertyValue("--color-green").trim(),
    styles.getPropertyValue("--color-violet").trim(),
  ];

  const chart = new ApexCharts(el, {
    chart: {
      type: "donut",
      background: "transparent",
      foreColor: "#e5e7eb",
      height: 160
    },
    theme: { mode: "dark" },
    series: props.series,
    labels: props.labels,
    colors,
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    stroke: {
        width: 0
    },
    tooltip: {
        theme: "dark",
        fillSeriesColor: false
    }
  });

  chart.render();
}