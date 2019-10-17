const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let attendanceQuery = "SELECT * FROM `attendance`";
    db.query(attendanceQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }else{
           res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let idattendance = req.body.idattendance;
    let biometric = req.body.biometric;
    let location_lat = req.body.location_lat;
    let location_long = req.body.location_long;
    let remarks = req.body.remarks;
    let subject_id = req.body.subject_id;
    let timestamp = req.body.timestamp ;
    let user_id = req.body.user_id;
    let user_type = req.body.user_type ;
       
    // send the student's details to the database
    let query = 
    "INSERT INTO `attendance` (idattendance, biometric, location_lat, location_long, remarks, subject_id, timestamp, user_id, user_type)"+ 
    "VALUES ('" + idattendance+"','" + biometric + "', '" + location_lat + "', '" + location_long + "', '" + remarks + "', '" + 
    subject_id + "', '" + timestamp + "', '" + user_id + "', '" + user_type + "')";
    console.log(query);
    db.query(query, (err, result) => {
    if (err) {
        return res.status(500).send(err);
        }
    res.status(201).json({
        message : 'Attendance details added successfully.'
        });
    });
});

router.get('/:idattendance', (req, res, next) =>{
    let idattendance = req.params.idattendance ;
    console.log("Attendance Id : " +  idattendance);
    let attendanceIdQuery = "SELECT * FROM `attendance` WHERE idattendance = '" + idattendance + "'";
    db.query(attendanceIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if(result.length==0){
        res.status(400).json({
            message : 'Attendance details are not found for this id.'
        });
    }
        else{
           res.send(result[0]);
        }
    });
});

router.get('/subject_id/:subject_id', (req, res, next) =>{
    let subject_id = req.params.subject_id;
    console.log("Subject id : " +  subject_id);
    let attendanceSubjectIdQuery = "SELECT * FROM `attendance` WHERE subject_id = '" + subject_id + "'";
    console.log(attendanceSubjectIdQuery);
    db.query(attendanceSubjectIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if(result.length==0){
        res.status(400).json({
            message : 'Attendance details are not found for this Student Email id.'
        });
    }
        else{
           res.send(result);
        }
    });
});

router.put('/:studentId', (req, res, next) => {
    res.status(200).json({
        message : 'Updated student!'
    });
});

router.delete('/:attendanceId', (req, res, next) => {
    let attendanceId = req.params.attendanceId;
    let deleteAttendanceQuery = 'DELETE FROM attendance WHERE idattendance = "' + attendanceId + '"';

    db.query(deleteAttendanceQuery, (error, result) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(200).json({
            message : 'Deleted attendance.'
        });
    });
});

module.exports = router ;