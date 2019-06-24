const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

const { Owner, MakeId } = require('../model/owner');

const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();

// //Get All User
// router.get('/', async (req, res) => {
//     let owner = await Owner.find();
//     res.send(owner)
// });



// User Reg
router.post('/', async (req, res) => {
    // const error = Validate(req.body);
    let owners = await Owner
        .find()
        .or([{ 'email': req.body.email }]);
    if (owners.length > 0) {
        let error = {}
        for (var i = 0; owners.length > i; i++) {
            if (owners[i].email === req.body.email) {
                error.email = "email already exist"
            }
        }
        return res.status(400).send({
            "status": "failed",
            "error": error
        })
    }

    let id;
    let owner = await Owner.find().sort({ _id: -1 }).limit(1);

    if (owner.length === 0) {
        id = MakeId("null")
    } else {
        id = MakeId(owner[0].userId)
    }

    owner = new Owner({
        userId: id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
    })
    const salt = await bcrypt.genSaltSync(10);
    owner.password = await bcrypt.hashSync(owner.password, salt)
    owner = await owner.save();

    res.send(owner)
});



module.exports = router;