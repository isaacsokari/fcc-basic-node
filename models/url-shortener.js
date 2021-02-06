require('dotenv').config();

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    unique: true,
    required: true,
  },
  short_url: {
    type: Number,
    unique: true,
    required: true,
  },
});

let UrlModel = mongoose.model('Url', urlSchema);

const getUrlCount = (done) => {
  const count = UrlModel.countDocuments({}, (err, data) => {
    if (err) done(err);

    done(null, data);
  });
};

const createShortUrl = (url, count, done) => {
  const newUrl = new UrlModel({ original_url: url, short_url: count });

  newUrl.save((err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

function findByUrl(url, done) {
  const urlFromDb = UrlModel.findOne({ original_url: url }, (err, data) => {
    if (err) done(err);

    done(null, data);
  });
}

const findByShortUrl = (short_url, done) => {
  const urlFromDb = UrlModel.findOne({ short_url }, (err, data) => {
    if (err) done(err);

    done(null, data);
  });
};

module.exports = { createShortUrl, findByUrl, findByShortUrl, getUrlCount };
