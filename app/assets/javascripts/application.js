//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

import { Chart } from "highcharts"

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  new Chart("test-chart", { series: [{ data: [1, 2, 3] }] })

  console.log("Hello world!")
})

alert()
