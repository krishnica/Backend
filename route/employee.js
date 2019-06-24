const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

const { Employee, MakeId } = require('../model/employee');

const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();

// Get by account id Details
router.get('/info/:ownerId', async (req, res) => {
    let supplier
    employee = await Employee.find({
        $and: [
            { ownerId: req.params.ownerId },
        ]
    });
    res.send(employee)
});



// User Reg
router.post('/', async (req, res) => {
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

    let id;
    let employee  = await Employee.find().sort({ _id: -1 }).limit(1);

    if (employee.length === 0) {
        id = MakeId("null")
    } else {
        id = MakeId(employee[0].employeeId)
    }

    employee = new Employee({
        employeeId: id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        ownerId : req.body.ownerId,
    })
    const salt = await bcrypt.genSaltSync(10);
    employee.password = await bcrypt.hashSync(employee.password, salt)
    employee = await employee.save();

    res.send(employee)
});

// Delete Details 
router.delete('/info/:id', async (req, res) => {
    let employee = await Employee.deleteOne({
        '_id': req.params.id
    })
    employee = await Employee.find();
    res.send(employee)
});

module.exports = router;
