//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit")
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get("/datasette/performance.json", async (req, res) => {
  try {
    const response = await fetch(
      `https://datasette.planning.data.gov.uk/performance.json?sql=${encodeURIComponent(
        req.query.sql,
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )

    res.json(await response.json())
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
