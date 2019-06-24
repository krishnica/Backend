const express = require('express');
const router = express.Router();


router.post('https://krishnica.jsreportonline.net/api/report', async (req, res) => {
    // const error = Validate(req.body);
    let employees = await Employee
        .find()
        .or([{ 'email': req.body.email }]);
    if (employees.length > 0) {
        let error = {}
        for (var i = 0; employees.length > i; i++) {
            if (employees[i].email === req.body.email) {
                error.email = "email already exist"
            }
        }
        return res.status(400).send({
            "status": "failed",
            "error": error
        })
    }
});
module.exports = router;