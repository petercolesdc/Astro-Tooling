import ApexCharts from "apexcharts";

export function mountBarChart(el: HTMLElement, props: any) {
  const styles = getComputedStyle(document.documentElement);

  const colors = [
    styles.getPropertyValue("--color-blue").trim() || "#3b82f6",
    styles.getPropertyValue("--color-yellow").trim() || "#eab308",
    styles.getPropertyValue("--color-orange").trim() || "#f97316",
    styles.getPropertyValue("--color-green").trim() || "#22c55e",
    styles.getPropertyValue("--color-violet").trim() || "#8b5cf6",
  ];

  const chart = new ApexCharts(el, {
    chart: {
      type: "bar",
      background: "transparent",
      foreColor: "#e5e7eb",
      toolbar: { show: false },
    },

    series: [
      {
        name: "Value",
        data: props.series
      }
    ],

    colors,

    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 6,
        columnWidth: "55%"
      }
    },

    dataLabels: {
      enabled: false
    },

    grid: {
      show: false
    },

    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },

    yaxis: {
      labels: { show: false }
    },

    legend: {
      show: false
    },

    tooltip: {
      theme: "dark"
    }
  });

  chart.render();
}