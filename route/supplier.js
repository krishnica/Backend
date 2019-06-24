const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

const { Supplier, MakeId } = require('../model/supplier');

const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();



// Get by account id Details
router.get('/info/:ownerId', async (req, res) => {
    let supplier
    supplier = await Supplier.find({
       ownerId: req.params.ownerId 
    });
    res.send(supplier)
});



// User Reg
router.post('/', async (req, res) => {
    // const error = Validate(req.body);
    let suppliers = await Supplier
        .find()
        .or([{ 'email': req.body.email }]);
    if (suppliers.length > 0) {
        let error = {}
        for (var i = 0; suppliers.length > i; i++) {
            if (suppliers[i].email === req.body.email) {
                error.email = "email already exist"
            }
        }
        return res.status(400).send({
            "status": "failed",
            "error": error
        })
    }

    let id;
    let supplier = await Supplier.find().sort({ _id: -1 }).limit(1);

    if (supplier.length === 0) {
        id = MakeId("null")
    } else {
        id = MakeId(supplier[0].supplierId)
    }

    supplier = new Supplier({
        supplierId: id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        ownerId: req.body.ownerId,
    })
    const salt = await bcrypt.genSaltSync(10);
    supplier.password = await bcrypt.hashSync(supplier.password, salt)
    supplier = await supplier.save();

    res.send(supplier)
});


// Delete Details 
router.delete('/info/:id', async (req, res) => {
    let supplier = await Supplier.deleteOne({
        '_id': req.params.id
    })
    supplier = await Supplier.find();
    res.send(supplier)
});




module.exports = router;
