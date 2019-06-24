const winston = require('winston')
module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    console.log(err);
    res.status(500).send({
        "message": 'Somthing Failed , this a backend Bug'
    })
}
// Every Backend Error Message Go By this 