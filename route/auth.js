const mongoose = require('mongoose');
const {
    Owner
} = require('../model/owner');

const _ = require('lodash')

const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const router = express.Router();



router.post('/owner', async (req, res) => {

    let owner = await Owner.findOne({
        email: req.body.email
    });
    if (!owner) return res.status(400).send({
        message: 'failed',
        error : {
            error : 'invalid username or password'
        }
    })
    const validPassword = await bcrypt.compareSync(req.body.password, owner.password)
    if (!validPassword) return res.status(400).send({
        message: 'failed',
        error : {
            error : 'invalid username or password'
        }
    });

    const token = owner.generateAuthToken();
    res.send({
        owner,
        "token": token
    })
});

module.exports = router;