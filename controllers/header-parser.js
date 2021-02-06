// server.js
// where your node router starts

// init project
var express = require('express');
var router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

// http://expressjs.com/en/starter/static-files.html

// your first API endpoint...
router.get('/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

router.get('/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.get('accept-language'),
    software: req.get('user-agent'),
  });
});

module.exports = router;
