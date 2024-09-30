// app.js
const express = require('express');
const pool = require('./connection_db.js');
const app = express();
const port = 3000;
const expressRouter = express.Router();

app.use(express.json());

//  Access to funding development for all activities
app.get('/CURRENT_FUNDING', async (req, res) => {
  const query = 'SELECT * FROM fundraiser WHERE isActive = 1';
  pool.execute(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//  Get all categories
app.get('/NAME', async (req, res) => {
  const query = 'SELECT * FROM category';
  pool.execute(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//  Retrieve all active fundraisers, including standards-based categories
app.get('/api/fundraiser/:ORGANIZER', async (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM fundraiser WHERE ORGANIZER = ? AND isActive = 1';
  pool.execute(query, [category], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//  Search for detailed fundraising events (by ID)
app.get('/api/fundraiser/:FUNDRAISER_ID', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM fundraiser WHERE FUNDRAISER_ID = ?';
  pool.execute(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Campaign not found');
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

moudle.exports = expressRouter;