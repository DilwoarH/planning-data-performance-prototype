const runQuery = require("./DatasetteService").runQuery

const getDatasets = async function () {
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

  return await runQuery(query)
}

const getDatasetCount = async function () {
  const datasets = await getDatasets()

  return datasets.rows.length
}

const getTotalLpaCount = async function () {
  const query = `select
    count(*) as "lpa_count"
    from
      organisation
    where
      "organisation" like "local-authority%"
  `

  const lpas = await runQuery(query)

  return lpas.rows?.[0]?.[0] ?? null
}

const getLpaInCohortCount = async function () {
  const query = `SELECT
    p.cohort,
    p.organisation,
    c.start_date as cohort_start_date
  FROM
    provision p
    INNER JOIN cohort c on c.cohort = p.cohort
  WHERE
    p.provision_reason = "expected"
    AND p.project == "open-digital-planning"
  GROUP BY
    p.organisation
  ORDER BY
    cohort_start_date,
    p.cohort
  `

  const lpas = await runQuery(query)

  return lpas.rows.length
}

const getStats = async function () {
  return {
    datasets: {
      count: await getDatasetCount(),
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
      total: await getTotalLpaCount(),
      total_in_cohort: await getLpaInCohortCount(),
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
