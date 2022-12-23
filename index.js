const express = require("express");
const InitiateMongo = require("./db/mongodb");
const routes = require('./routes/routes');
const port = process.env.PORT || 4000;
const app = express();
const bodyParser = require("body-parser");

require('dotenv').config();


InitiateMongo();
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`running on port ${port}`)
})