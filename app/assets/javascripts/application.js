//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

async function addActiveEndpointChart() {
  let data = await fetch(
    `/datasette/performance.json?sql=select+organisation_name+as+"name"%2C+sum%28active_endpoint_count%29+as+"active_endpoints"+from+provision_summary%0D%0Awhere+organisation+like+"local-authority%3A%25"%0D%0Agroup+by+organisation%0D%0Ahaving+active_endpoints+>+0%0D%0Aorder+by+active_endpoints+desc+limit+10`,
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
}

async function addDatasetEntryByMonthChart() {
  // dataset.json?sql=SELECT%0D%0A++strftime%28%27%25Y-%25m%27%2C+entry_date%29+AS+year_month%2C%0D%0A++COUNT%28*%29+AS+dataset_count%0D%0AFROM%0D%0A++dataset%0D%0AGROUP+BY%0D%0A++year_month%0D%0AORDER+BY%0D%0A++year_month%3B
}

document.addEventListener("DOMContentLoaded", async function () {
  addActiveEndpointChart()
})
