const runQuery = async function (sql, database = "digital-land") {
  const response = await fetch(
    `https://datasette.planning.data.gov.uk/${database}.json?sql=${encodeURIComponent(
      sql,
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  )

  return await response.json()
}

module.exports = {
  runQuery,
}
