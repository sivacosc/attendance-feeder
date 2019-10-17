const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let studentsQuery = "SELECT * FROM `student`";
    db.query(studentsQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }

    });
});

router.post('/', (req, res, next) => {
    let idstudent = req.body.idstudent;
    let name = req.body.name;
    let email_id = req.body.email_id;
    let department = req.body.department;
    let mobile_number = req.body.mobile_number;
    let address = req.body.address;
    let misc = req.body.misc;

    let usernameQuery = "SELECT * FROM `student` WHERE idstudent = '" + idstudent + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Student details already exists';
            return res.status(400).json({
                message: 'Student details already exists.'
            });
        } else {
            // send the student's details to the database
            let query = "INSERT INTO `student` (idstudent,name, email_id, department, mobile_number,address,misc) VALUES ('" +
                idstudent + "','" +
                name + "', '" + email_id + "', '" + department + "', '" + mobile_number + "', '" + address + "', '" + misc + "')";
            console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Student details added successfully.'
                });
            });
        }
    });
});

router.get('/:studentId', (req, res, next) => {
    let studentId = req.params.studentId;
    console.log("Input student id : " + studentId);
    let studentIdQuery = "SELECT * FROM `student` WHERE idstudent = '" + studentId + "'";
    db.query(studentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Student details are not found for this student id.'
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
    let studentEmailIdQuery = "SELECT * FROM `student` WHERE email_id = '" + email_id + "'";
    console.log(studentEmailIdQuery);
    db.query(studentEmailIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Student details are not found for this Student Email id.'
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

router.delete('/:studentId', (req, res, next) => {
    let studentId = req.params.studentId;
    let studentIdQuery = "SELECT * FROM `student` WHERE idstudent = '" + studentId + "'";
    db.query(studentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Student details are not found for this student id.'
            });
        } else {
            let deleteStudentQuery = 'DELETE FROM student WHERE idstudent = "' + studentId + '"';
            db.query(deleteStudentQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted student.'
                });
            });
        }
    });
});

module.exports = router;