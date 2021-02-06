// init project
const express = require('express');
const router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 

// http://expressjs.com/en/starter/static-files.html
router.use(express.static('public'));

// your first API endpoint... 
router.get("/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

router.get("/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() })
})

router.get("/timestamp/:date", (req, res) => {
  const { date } = req.params;
  const dateObject = new Date(date);

  if (/\d{5,}/.test(date)) {
    res.json({ unix: +date, utc: new Date(+date).toUTCString() })
  } else if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() })
  }

})


module.exports = router;
