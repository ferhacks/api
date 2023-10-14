const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs'); // Importa el módulo fs
const { RandomAgresivo, getFileName } = require('./func/functions');

router.get('/', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = RandomAgresivo(0, data.length - 1);
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const tmpFileName = getFileName('video', '../tmp'); 
    const tmpFilePath = path.join(__dirname, '..', 'tmp', tmpFileName);
    constole.log(tmpFileName)
    constole.log(tmpFilePath)
    fs.writeFileSync(tmpFilePath, Buffer.from(videoResponse.data, 'base64'));
    res.sendFile(tmpFilePath, { root: path.join(__dirname, '..') });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;



/*const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { RandomAgresivo, getFileName } = require('./func/functions');

router.get('/', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = RandomAgresivo(0, data.length - 1);
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'base64');
    res.end(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;*/
