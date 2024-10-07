//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit")
const router = govukPrototypeKit.requests.setupRouter()
const runQuery = require("./services/DatasetteService").runQuery

// Add your routes here
router.get("/", (req, res) => {
  res.render("index")
})

router.get("/stats", (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  })
})

router.get("/datasette/:database_name.json", async (req, res) => {
  try {
    res.json(await runQuery(req.query.sql, req.params.database_name))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
