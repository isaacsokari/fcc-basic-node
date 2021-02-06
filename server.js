require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiControllers = require('./controllers/index');
const database = require('./db/database');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/shorturl', function (req, res) {
  res.sendFile(process.cwd() + '/views/url-shortener/index.html');
});

app.get('/shorturl/:shorturl', function (req, res) {
  res.redirect(`/api/shorturl/${req.params.shorturl}`);
});

app.get('/fileanalyse', function (req, res) {
  res.sendFile(process.cwd() + '/views/file-metadata/index.html');
});

app.get('/whoami', function (req, res) {
  res.sendFile(process.cwd() + '/views/header-parser/index.html');
});

app.get('/timestamp', function (req, res) {
  res.sendFile(process.cwd() + '/views/timestamp/index.html');
});

app.get('/exercise', function (req, res) {
  res.sendFile(process.cwd() + '/views/exercise-tracker/index.html');
});

app.use('/api', apiControllers);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
  database.connect();
});
