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
    datasets: {
      count: datasets.rows.length,
      article_4_direction_coverage_percentage: null,
      article_4_direction_coverage_percentage_increase_last_30_days: null,
      article_4_direction_area_coverage_percentage: null,
      article_4_direction_area_coverage_percentage_increase_last_30_days: null,
      conservation_area_coverage_percentage: null,
      conservation_area_coverage_percentage_increase_last_30_days: null,
      conservation_area_document_coverage_percentage: null,
      conservation_area_document_coverage_percentage_increase_last_30_days:
        null,
      listed_building_coverage_percentage: null,
      listed_building_coverage_percentage_increase_last_30_days: null,
      tree_preservation_order_coverage_percentage: null,
      tree_preservation_order_coverage_percentage_increase_last_30_days: null,
      tree_preservation_zone_coverage_percentage: null,
      tree_preservation_zone_coverage_percentage_increase_last_30_days: null,
      tree_coverage_percentage: null,
      tree_coverage_percentage_increase_last_30_days: null,
    },
    organisation: {
      count: null,
    },
    data_sources: {
      total: null,
      total_provided: null,
      increase_last_30_days: null,
      increase_last_30_days_percentage: null,
    },
    local_planning_authorities: {
      total: null,
      count_with_data_sources: null,
      count_with_no_data_sources: null,
      increase_last_30_days: null,
      increase_last_30_days_percentage: null,
    },
    quality_checks: {
      total_data_sources_with_no_issues: null,
      total_data_sources_with_specification_conformation: null,
      total_improved_data_sources_in_last_30_days: null,
      total_improved_data_sources_in_last_30_days_percentage: null,
    },
  }
}

module.exports = {
  getDatasetCount,
  getStats,
}
