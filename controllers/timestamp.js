// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() })
})

app.get("/api/timestamp/:date", (req, res) => {
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



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
