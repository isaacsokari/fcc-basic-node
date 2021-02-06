require('dotenv').config();
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: false });

const router = express.Router();

router.post('/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file);

  const { mimetype: type, originalname: name, size } = req.file;

  res.json({ name, type, size });
});

module.exports = router;
