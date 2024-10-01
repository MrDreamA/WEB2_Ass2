//Complete the modules required for this project
const express = require ('express');
const expressRouter = express.Router();
const db = require("./database");
const connection = db.getConnection();
connection.connect();

//GET routing, extracting information from the database based on ID
expressRouter.get('/fundraiser/:id', (req, res) => {
  const { id } = req.params;//Get the fundraiser ID from the request parameter
  connection.query("SELECT * FROM fundraiser WHERE FUNDRAISER_ID = ?", [id], (err, records) => {
    if (err) {
      console.error('Error retrieving fundraiser:', err);
      res.status(500).send('Internal Server Error');//If an error occurs, 500 status code and error message are returned
    } else {
      if (records.length > 0) {
        res.json(records[0]);
      } else {
        res.status(404).send('Fundraiser not found');//If the record is found, return the JSON data of the first record, if no record is found, return a 404 status code and error message
      }
    }
  });
});
//Search for routes to fundraising events by organizer, city, and category
//Use it on the Search page
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
  `;//Define an SQL query that joins the fundraiser and category tables using joins and filters based on the criteria provided

  const params = [organizer, organizer, city, city, category, category];

  connection .query(sql, params, (err, results) => {
    if (err) {
      console.error('Error searching fundraisers:', err);
      res.status(500).send('Internal Server Error');//If the record is found, return the JSON data of the first record, if no record is found, return a 404 status code and error message
    } else {
      res.json(results);
    }
  });
});

//Used to get all organizers
const sql2 = `
select ORGANIZER from fundraiser
`;
//Use it on the Homepage
expressRouter.get('/organizer', (request, response) => {
  connection.query(sql2, (err, data) => {
      if (err) {
          console.error('Error retrieving organizer data:', err);
          response.status(500).send('Internal Server Error');//If the record is found, return the JSON data of the first record, if no record is found, return a 404 status code and error message
      } else {
          response.json(data);
      }
  });
});
//Used to get all categories
expressRouter.get('/category', (request, response) => {
  connection.query("SELECT * FROM category",(err,records,fields) => {
    if (err) {
      console.error('Error retrieving product:', err);
    } else {
      response.send(records);
    }
  });
});
// Export route objects
module.exports = expressRouter;
