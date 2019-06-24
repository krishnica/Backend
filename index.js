const winston = require('winston');
const express = require('express');
// var config = require('./constant/config');

const app = express();
var https = require('https');
var fs = require('fs');

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
// require('./startup/config')();



const port = process.env.PORT || 5000
app.listen(port, () => winston.info(`Listening on port ${port}`))

