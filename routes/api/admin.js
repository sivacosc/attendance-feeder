const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let adminQuery = "SELECT * FROM `admin`";
    db.query(adminQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    let name = req.body.name;
    let departments_csv = req.body.departments_csv;
    let email_address = req.body.email_address;
    let credential_key = req.body.credential_key;
    let idadmin = req.body.idadmin;

    let adminQuery = "SELECT * FROM `admin` WHERE email_address = '" + email_address + "'";
    db.query(adminQuery, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (result.length > 0) {
            message = 'Admin details already exists';
            return res.status(400).json({
                message: 'Admin details already exists.'
            });
        } else {
            // send the admin details to the database
            let query = "INSERT INTO `admin` (idadmin, name, email_address, departments_csv, credential_key) VALUES ('" +
                idadmin + "','" + name + "', '" + email_address + "', '" + departments_csv + "', '" + credential_key + "')";
            console.log(query);
            db.query(query, (error, result) => {
                if (error) {
                    return res.status(500).send(error);
                }
                res.status(201).json({
                    message: 'Admin details added successfully.'
                });
            });
        }
    });
});

router.get('/:adminId', (req, res, next) => {
    let adminId = req.params.adminId;
    console.log("Input admin id : " + adminId);
    let adminIdQuery = "SELECT * FROM `admin` WHERE idadmin = '" + adminId + "'";
    db.query(adminIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Admin details are not found for this id.'
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
    let adminEmailIdQuery = "SELECT * FROM `admin` WHERE email_address = '" + email_id + "'";
    console.log(adminEmailIdQuery);
    db.query(adminEmailIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Admin details are not found for this Admin Email-id.'
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

router.delete('/:adminId', (req, res, next) => {
    let adminId = req.params.adminId;
    let adminIdQuery = "SELECT * FROM `admin` WHERE idadmin = '" + adminId + "'";
    db.query(adminIdQuery, (error, result, fields) => {
        if (error) {
            res.status(500).send(error);
        }
        else if (result.length == 0) {
            res.status(400).json({
                message: 'Admin details are not found for this id.'
            });
        } else {
            let deleteAdminQuery = 'DELETE FROM admin WHERE idadmin = "' + adminId + '"';
            db.query(deleteAdminQuery, (error, result) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).json({
                    message: 'Deleted admin.'
                });
            });
        }
    });
});

module.exports = router;