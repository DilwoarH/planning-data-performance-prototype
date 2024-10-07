const runQuery = require("./DatasetteService").runQuery

const getDatasetCount = async function () {
  const query = `SELECT
    dataset.*,
    GROUP_CONCAT(dataset_theme.theme, ';') AS themes
  FROM
    dataset
    INNER JOIN dataset_theme ON dataset.dataset = dataset_theme.dataset
  WHERE
    collection != ''
  GROUP BY
    dataset.dataset
  `

  const data = await runQuery(query)

  return data
}

const getStats = async function () {
  const datasets = await getDatasetCount()

  return {
    dataset_count: datasets.rows.length,
  }
}

module.exports = {
  getDatasetCount,
  getStats,
}
