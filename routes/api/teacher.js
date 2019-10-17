const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let teachersQuery = "SELECT * FROM `teacher`";
    db.query(teachersQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let idteacher = req.body.idteacher;
    let name = req.body.name;
    let email_address = req.body.email_address;
    let departments = req.body.departments;
    let mobile_number = req.body.mobile_number;
    let address = req.body.address;
    let credentials = req.body.credential_key;
    let specialization = req.body.specialization_csv;
    let misc = req.body.misc;

    let teacherQuery = "SELECT * FROM `teacher` WHERE idteacher = '" + idteacher + "'";

    db.query(teacherQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Teacher details already exists';
            return res.status(400).json({
                message: 'Teacher details already exists.'
            });
        } else {
            // send the student's details to the database
            let query = "INSERT INTO `teacher` (idteacher, name, email_address, departments, mobile_number, address ,misc, credential_key, specialization_csv) VALUES ('" +
                idteacher + "','" + name + "', '" + email_address + "', '" + departments + "', '" + mobile_number + "', '" +
                address + "', '" + misc + "', '" + credentials + "', '" + specialization + "')";
            console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Teacher details added successfully.'
                });
            });
        }
    });
});

router.get('/:teacherId', (req, res, next) => {
    let teacherId = req.params.teacherId;
    console.log("Input teacher id : " + teacherId);
    let teacherIdQuery = "SELECT * FROM `teacher` WHERE idteacher = '" + teacherId + "'";
    db.query(teacherIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Teacher details are not found for this id.'
            });
        }
        else {
            res.send(result[0]);
        }
    });
});

router.get('/email_id/:email_id', (req, res, next) => {
    let email_id = req.params.email_id;
    console.log("Input Email id : " + email_id);
    let teacherEmailIdQuery = "SELECT * FROM `teacher` WHERE email_address = '" + email_id + "'";
    console.log(teacherEmailIdQuery);
    db.query(teacherEmailIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Teacher details are not found for this teacher Email id.'
            });
        }
        else {
            res.send(result);
        }
    });
});

router.put('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated student!'
    });
});

router.delete('/:teacherId', (req, res, next) => {
    let teacherId = req.params.teacherId;
    let teacherIdQuery = "SELECT * FROM `teacher` WHERE idteacher = '" + teacherId + "'";
    db.query(teacherIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Teacher details are not found for this id.'
            });
        } else {
            let deleteTeacherQuery = 'DELETE FROM teacher WHERE idteacher = "' + teacherId + '"';
            db.query(deleteTeacherQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted teacher.'
                });
            });
        }
    });
});

module.exports = router;