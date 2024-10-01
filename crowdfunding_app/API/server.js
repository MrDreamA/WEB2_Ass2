const express = require("express");

const bodyParser = require("body-parser");

const path = require('path');

const db = require('./details');

const server = express();

const port = 3000;

server.use(express.json());
server.use(express.static(path.join(__dirname, 'Cilent_side')));



const expressRouter = require('./api_c');
server.use('/api', expressRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'homepage.html'));
});

server.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'search.html'));
});

server.get('/fundraisers', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'fundraisers.html'));
});
server.listen(port, (err) => {
    if (err) {
        console.error("Failed", err);
    } else {
        console.log(`Server is up now and running on port ${port}`);
    }
});
