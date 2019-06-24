const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');


// const auth = require('../route/auth');
const error = require('../middleware/error');
const owner = require('../route/owner');
const employee = require('../route/employee');
const supplier = require('../route/supplier');
const auth = require('../route/auth');

const upload = require('express-fileupload')


module.exports = function (app) {
    app.use(cors())
    app.use(upload()); //File Upload
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('upload'))  //Static Urls

    app.use('/owners', owner);
    app.use('/employees', employee);
    app.use('/suppliers', supplier);
    app.use('/auth', auth);

    
    app.use(error)
}