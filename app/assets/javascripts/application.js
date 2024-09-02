//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

document.addEventListener("DOMContentLoaded", async function () {
  let data = await fetch(
    "/datasette/performance.json?sql=select+%22name%22%2C+sum%28active_endpoint_count%29+as+%22active_endpoints%22+from+provision_summary%0D%0Agroup+by+organisation%0D%0Ahaving+active_endpoints+%3E+0%0D%0Aorder+by+active_endpoints+desc+limit+10",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  )

  data = await data.json()

  const chart = Highcharts.chart("container", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Top 10 organisations by active endpoints",
    },
    xAxis: {
      categories: data.rows.map((row) => row[0]),
    },
    yAxis: {
      title: {
        text: "Active endpoints",
      },
    },
    series: [
      {
        name: "Active endpoints",
        data: data.rows.map((row) => row[1]),
        color: "#1d70b8",
      },
    ],
  })
})
