const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let studentEnrollmentQuery = "SELECT * FROM `student_enrollment`";
    db.query(studentEnrollmentQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let idstudent = req.body.idstudent;
    let idsubject = req.body.idsubject;
    let idstudent_enrollment = req.body.idstudent_enrollment;

    let studentEnrollmentQuery = "SELECT * FROM `student_enrollment` WHERE idstudent_enrollment = '" + idstudent_enrollment + "'";

    db.query(studentEnrollmentQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Student enrollment details already exists';
            return res.status(400).json({
                message: 'Student enrollment details already exists.'
            });
        } else {
            // send the student's details to the database
            let query = "INSERT INTO `student_enrollment` (idstudent, idsubject, idstudent_enrollment) VALUES ('" +
                idstudent + "','" + idsubject + "', '" + idstudent_enrollment + "')";
            console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Student enrollment details added successfully.'
                });
            });
        }
    });
});

router.get('/:studentEnrollmentId', (req, res, next) => {
    let studentEnrollmentId = req.params.studentEnrollmentId;
    console.log("Input student enrollment id : " + studentEnrollmentId);
    let studentEnrollmentIdQuery = "SELECT * FROM `student_enrollment` WHERE idstudent_enrollment = '" + studentEnrollmentId + "'";
    db.query(studentEnrollmentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Student enrollment details are not found for this id.'
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

router.delete('/:studentEnrollmentId', (req, res, next) => {
    let studentEnrollmentId = req.params.studentEnrollmentId;
    console.log("Input student enrollment id : " + studentEnrollmentId);
    let studentEnrollmentIdQuery = "SELECT * FROM `student_enrollment` WHERE idstudent_enrollment = '" + studentEnrollmentId + "'";
    db.query(studentEnrollmentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Student enrollment details are not found for this id.'
            });
        } else {
            let deleteStudentEnrollmentQuery = 'DELETE FROM student_enrollment WHERE idstudent_enrollment = "' + studentEnrollmentId + '"';
            db.query(deleteStudentEnrollmentQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted student enrollment id.'
                });
            });
        }
    });
});

module.exports = router;