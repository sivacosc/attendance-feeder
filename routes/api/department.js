const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let departmentsQuery = "SELECT * FROM `department`";
    db.query(departmentsQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let iddepartment = req.body.iddepartment;
    let name = req.body.name;
    let misc = req.body.misc;

    let departmentQuery = "SELECT * FROM `department` WHERE iddepartment = '" + iddepartment + "'";

    db.query(departmentQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Department details already exists';
            return res.status(400).json({
                message: 'Department details already exists.'
            });
        } else {
            // send the department's details to the database
            let query = "INSERT INTO `department` (iddepartment, name, misc) VALUES ('" +
                iddepartment + "','" + name + "', '" + misc + "')";
            console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Department details added successfully.'
                });
            });
        }
    });
});

router.get('/:departmentId', (req, res, next) => {
    let departmentId = req.params.departmentId;
    console.log("Input department id : " + departmentId);
    let departmentIdQuery = "SELECT * FROM `department` WHERE iddepartment = '" + departmentId + "'";
    db.query(departmentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Department details are not found for this id.'
            });
        }
        else {
            res.send(result[0]);
        }
    });
});

router.put('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated student!'
    });
});

router.delete('/:departmentId', (req, res, next) => {
    let departmentId = req.params.departmentId;
    let departmentQuery = "SELECT * FROM `department` WHERE iddepartment = '" + departmentId + "'";
    db.query(departmentQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Department details are not found for this department id.'
            });
        } else {
            let deleteDepartmentQuery = 'DELETE FROM department WHERE iddepartment = "' + departmentId + '"';
            db.query(deleteDepartmentQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted department.'
                });
            });
        }
    });
});

module.exports = router;