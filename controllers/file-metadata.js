require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const upload = multer({ dest: false });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), (req, res) => {
  console.log(req.file)

  const {mimetype: type, originalname: name, size} = req.file;

  res.json({name, type, size});
})


const port = process.env.PORT || 3000;

