// app.js
const express = require ('express');
const expressRouter = express.Router();
const db = require("./database");
const connection = db.getConnection();
connection.connect();
//expressRouter.use(express.json());


expressRouter.get('/fundraiser/:id', (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM fundraiser WHERE FUNDRAISER_ID = ?", [id], (err, records) => {
    if (err) {
      console.error('Error retrieving fundraiser:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (records.length > 0) {
        res.json(records[0]);
      } else {
        res.status(404).send('Fundraiser not found');
      }
    }
  });
});

expressRouter.get('/search', (req, res) => {
  const { organizer, city, category } = req.query;
  if (!organizer && !city && !category) {
    return res.status(400).send('At least one search criteria must be provided');
  }

  const sql = `
    SELECT fund.*, cate.NAME as CATEGORY_NAME 
    FROM fundraiser fund 
    JOIN category cate ON fund.CATEGORY_ID = cate.CATEGORY_ID 
    WHERE (fund.ORGANIZER = ? OR ? = '') 
    AND (fund.CITY = ? OR ? = '') 
    AND (fund.CATEGORY_ID = ? OR ? = '') 
    AND fund.ACTIVE = 1
  `;

  const params = [organizer, organizer, city, city, category, category];

  connection .query(sql, params, (err, results) => {
    if (err) {
      console.error('Error searching fundraisers:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

const sql2 = `
select ORGANIZER from fundraiser
`;
expressRouter.get('/organizer', (request, response) => {
  connection.query(sql2, (err, data) => {
      if (err) {
          console.error('Error retrieving organizer data:', err);
          response.status(500).send('Internal Server Error');
      } else {
          response.json(data);
      }
  });
});

expressRouter.get('/category', (request, response) => {
  connection.query("SELECT * FROM category",(err,records,fields) => {
    if (err) {
      console.error('Error retrieving product:', err);
    } else {
      response.send(records);
    }
  });
});

module.exports = expressRouter;
/** 
const sql1 = `
    SELECT cate.NAME, fund.* 
    FROM category cate 
    JOIN fundraiser fund ON fund.CATEGORY_ID = CATEGORY_ID 
    WHERE (fund.CITY = ? OR ? = '') 
    AND (fund.ORGANIZER = ? OR ? = '') 
    AND (fund.CATEGORY_ID = ? OR ? = '') 
    AND fund.ACTIVE = 1
`;


expressRouter.get('/Search', (request, response) => {
  const query = request.query;
  for (const key in request.query) {
      query[key] = !!query[key] ? query[key] : '';
  }
  const arr = [query.CITY, query.CITY, query.ORGANIZER, query.ORGANIZER, query.CATEGORY_ID, query.CATEGORY_ID];
  connection.query(sql1, arr, function(err, data) {
      response.send(data)
  });
})

expressRouter.get('/fundraiser/:id', (request, response) => {
  const { id } = request.params;
  connection.query("SELECT * FROM fundraiser WHERE FUNDRAISER_ID = ?", [id], (err, records, fields) => {
      if (err) {
          console.error('Error retrieving fundraiser:', err);
          response.status(500).send('Internal Server Error');
      } else {
        response.json(records);
      }
  });
});
*/