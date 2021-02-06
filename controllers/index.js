const express = require('express');
const router = express.Router();

const exerciseRouter = require('./exercise-tracker');
const metadataRouter = require('./file-metadata');
const timestampRouter = require('./timestamp');
const headerRouter = require('./header-parser.js');
const urlShortenerRouter = require('./url-shortener');

router.use(
  exerciseRouter,
  metadataRouter,
  timestampRouter,
  headerRouter,
  urlShortenerRouter
);

module.exports = router;
