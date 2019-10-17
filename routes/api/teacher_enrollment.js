const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let teacherEnrollmentQuery = "SELECT * FROM `teacher_enrollment`";
    db.query(teacherEnrollmentQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let idteacher = req.body.idteacher;
    let idsubject = req.body.idsubject;
    let idteacher_enrollment = req.body.idteacher_enrollment;

    let teacherEnrollmentQuery = "SELECT * FROM `teacher_enrollment` WHERE idteacher_enrollment = '" + idteacher_enrollment + "'";

    db.query(teacherEnrollmentQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.length > 0) {
            message = 'Teacher enrollment details already exists';
            return res.status(400).json({
                message: 'Teacher enrollment details already exists.'
            });
        } else {
            // send the student's details to the database
            let query = "INSERT INTO `teacher_enrollment` (idteacher, idsubject, idteacher_enrollment) VALUES ('" +
                idteacher + "','" + idsubject + "', '" + idteacher_enrollment + "')";
            console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Teacher enrollment details added successfully.'
                });
            });
        }
    });
});

router.get('/:teacherEnrollmentId', (req, res, next) => {
    let teacherEnrollmentId = req.params.teacherEnrollmentId;
    console.log("Input Teacher enrollment id : " + teacherEnrollmentId);
    let studentEnrollmentIdQuery = "SELECT * FROM `teacher_enrollment` WHERE idteacher_enrollment = '" + teacherEnrollmentId + "'";
    db.query(studentEnrollmentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Teacher enrollment details are not found for this id.'
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

router.delete('/:teacherEnrollmentId', (req, res, next) => {
    let teacherEnrollmentId = req.params.teacherEnrollmentId;
    console.log("Input Teacher enrollment id : " + teacherEnrollmentId);
    let studentEnrollmentIdQuery = "SELECT * FROM `teacher_enrollment` WHERE idteacher_enrollment = '" + teacherEnrollmentId + "'";
    db.query(studentEnrollmentIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Teacher enrollment details are not found for this id.'
            });
        } else {
            let deleteStudentEnrollmentQuery = 'DELETE FROM teacher_enrollment WHERE idteacher_enrollment = "' + teacherEnrollmentId + '"';
            db.query(deleteStudentEnrollmentQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted Teacher enrollment id.'
                });
            });
        }
    });
});

module.exports = router;