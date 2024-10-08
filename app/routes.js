//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit")
const getStats = require("./services/PerformanceService").getStats
const router = govukPrototypeKit.requests.setupRouter()
const runQuery = require("./services/DatasetteService").runQuery

// Add your routes here
router.get("/", async (req, res) => {
  res.render("index", {
    stats: await getStats(),
  })
})

router.get("/stats", async (req, res) => {
  res.json(await getStats())
})

router.get("/datasette/:database_name.json", async (req, res) => {
  try {
    res.json(await runQuery(req.query.sql, req.params.database_name))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
