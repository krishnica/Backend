const winston =  require('winston');
const mongoose = require('mongoose');


module.exports = function () {
    mongoose.connect('mongodb://admin:admin123@ds235418.mlab.com:35418/bookshop', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => winston.info('connected to MongoDB...'))
        .catch(err => console.log("Unable to connect", err));
}

/*module.exports = function () {
    mongoose.connect('mongodb://localhost/DB123', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => winston.info('connected to MongoDB...'))
        .catch(err => console.log("Unable to connect", err));
}*/