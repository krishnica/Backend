const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-pikanite-token');
    if (!token) return res.status(401).send({
        message  : 'Access Denied, No token provieded',
        code : 400
    });
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey')
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth