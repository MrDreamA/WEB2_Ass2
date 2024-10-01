const express = require("express");
const bodyParser = require("body-parser");//Used to parse the request body
const path = require('path');//Process and convert file paths
const db = require('./details');//Custom database module
const server = express();//Create an Express application instance
//Introduce required modules
const port = 3000;
//Defines the port number on which the server listens
server.use(express.json());//Parse the request body using JSON middleware
server.use(express.static(path.join(__dirname, 'Cilent_side')));// Set a static file directory for clients to access static resources

const expressRouter = require('./api_c');//Custom routing module
server.use('/api', expressRouter);//With the custom routing module, all requests beginning with /api are handled by the expressRouter

//GET route, used to return to the home page
server.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'homepage.html'));//Return to the HTML file for the home page
});

//Return to search page
server.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'search.html'));//Returns the HTML file for the search page
});

//Start the server and listen on the specified port
server.get('/fundraisers', (req, res) => {
  res.sendFile(path.join(__dirname, '../Cilent_side', 'fundraisers.html'));
});
server.listen(port, (err) => {
    if (err) {
        console.error("Failed", err);
    } else {
        console.log(`Server is up now and running on port ${port}`);//If the startup fails, an error message is displayed. If the server is successfully started, the server running information is displayed
    }
});
