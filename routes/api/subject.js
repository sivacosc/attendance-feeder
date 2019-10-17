const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let subjectQuery = "SELECT * FROM `subject`";
    db.query(subjectQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let idsubject = req.body.idsubject;
    let name = req.body.name;
    let credits = req.body.credits;
    let department = req.body.department;
    let misc = req.body.misc;

    let subjectQuery = "SELECT * FROM `subject` WHERE idsubject = '" + idsubject + "'";

    db.query(subjectQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Subject details already exists';
            return res.status(400).json({
                message: 'Subject details already exists.'
            });
        } else {
            // send the subjects's details to the database
            let query = "INSERT INTO `subject` (idsubject, name, credits, department, misc) VALUES ('" +
                idsubject + "','" + name + "', '" + credits + "', '" + department + "', '" + misc + "')";
            console.log(query);
            db.query(query, (error, result) => {
                if (error) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'Subject details added successfully.'
                });
            });
        }
    });
});

router.get('/:subjectId', (req, res, next) => {
    let subjectId = req.params.subjectId;
    console.log("Subject id : " + subjectId);
    let subjectIdQuery = "SELECT * FROM `subject` WHERE idsubject = '" + subjectId + "'";
    db.query(subjectIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Subject details are not found for this subject id.'
            });
        }
        else {
            res.send(result[0]);
        }
    });
});

router.get('/department/:department', (req, res, next) => {
    let department = req.params.department;
    console.log("Department : " + department);
    let subjectQuery = "SELECT * FROM `subject` WHERE department = '" + department + "'";
    console.log(subjectQuery);
    db.query(subjectQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Subject details are not found for this Department.'
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

router.delete('/:subjectId', (req, res, next) => {
    let subjectId = req.params.subjectId;
    let subjectIdQuery = "SELECT * FROM `subject` WHERE idsubject = '" + subjectId + "'";
    db.query(subjectIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Subject details are not found for this subject id.'
            });
        } else {
            let deleteSubjectQuery = 'DELETE FROM subject WHERE idsubject = "' + subjectId + '"';
            db.query(deleteSubjectQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted subject.'
                });
            });
        }
    });
});

module.exports = router;