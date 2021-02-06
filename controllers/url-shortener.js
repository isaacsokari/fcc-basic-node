require('dotenv').config();
const urlRegex = /[(http(s)?), (ftp(s)?)]:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const express = require('express');
const bodyParser = require('body-parser');
const { URL } = require('url');

const {
  createShortUrl,
  findByUrl,
  findByShortUrl,
  getUrlCount,
} = require('../models/url-shortener');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// getUrlCount middleware
const getDbUrlCount = async (req, res, next) => {
  const { url } = req.body;

  // test url validity using URL class
  let urlToSave;

  try {
    urlToSave = new URL(url);
    // check url protocol
    if (!['http:', 'https:'].includes(urlToSave.protocol)) {
      throw new Error('invalid url protocol');
    }

    req.body.url = urlToSave.toString();
  } catch (err) {
    console.error({ error: err.message });
    return res.json({ error: 'invalid url' });
  }
  // return console.log(urlToSave)

  const count = getUrlCount((err, data) => {
    if (err) console.error(err.message);

    // set count to req object
    req.body.count = data;
    next();
  });
};

router.post('/shorturl/new', getDbUrlCount, (req, res) => {
  const { url, count } = req.body;

  // console.log({url, count})

  const urlInDB = findByUrl(url, (err, data) => {
    if (err) return console.error(err.message);

    // console.log(data);

    // if url is in db, return url and short_url
    if (data) {
      return res
        .status(200)
        .json({ original_url: data.original_url, short_url: data.short_url });
    }

    createShortUrl(url.trim(), count, (err, newUrl) => {
      if (err) return console.error(err.message);

      if (newUrl) {
        return res.status(201).json({
          original_url: newUrl.original_url,
          short_url: newUrl.short_url,
        });
      }
    });
  });
});

router.get('/shorturl/:short_url', (req, res) => {
  const { short_url } = req.params;

  if (!short_url)
    return res.status(400).json({ error: 'No Short URL provided' });
  const doc = findByShortUrl(short_url, (err, data) => {
    if (err) return console.error(err.message);

    // console.log(data)

    if (data) return res.status(300).redirect(data.original_url);
    res.status(400).json({ error: 'URL not found' });
  });

  // next()
});

module.exports = router;

// [
//     'http://freecodecamp.org',
//     'http://freecodecamp.org/',
//     'http://www.freecodecamp.org',
//     'http://www.freecodecamp.org/',
//     'https://freecodecamp.org',
//     'https://freecodecamp.org/',
//     'https://www.freecodecamp.org',
//     'https://www.freecodecamp.org/',
//     'http://freecodecamp.org/path',
//     'http://freecodecamp.org/path/',
//     'http://freecodecamp.org/path?a=1',
//     'http://freecodecamp.org/path?a=1&b=2'
// ]
