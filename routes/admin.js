const fs = require('fs');

module.exports = {
    addAdminPage: (req, res) => {
        res.render('add-admin.ejs', {
            title: "Welcome to Socka | Add a new admin"
            , message: ''
        });
    },
    addAdmin: (req, res) => {
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let departments_csv = req.body.departments_csv;
        let email_address = req.body.email_address;
        let password = req.body.password;
        let name = first_name + " " + last_name

        let usernameQuery = "SELECT * FROM `admin` WHERE email_address = '" + email_address + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Email address already exists';
                res.render('add-admin.ejs', {
                    message,
                    title: "Welcome to AR School Database | Add a new admin"
                });
            } else {
                // send the admin's details to the database
                let query = "INSERT INTO `admin` (name, email_address, departments_csv, credential_key) VALUES ('" +
                    name + "', '" + email_address + "', '" + departments_csv + "', '" + password + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },
    editAdminPage: (req, res) => {
        let adminId = req.params.idadmin;
        let query = "SELECT * FROM `admin` WHERE idadmin = '" + adminId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-admin.ejs', {
                title: "Edit  Admin"
                , admin: result[0]
                , message: ''
            });
        });
    },
    editAdmin: (req, res) => {
        let adminId = req.params.idadmin;
        let name = req.body.name;
        let departments_csv = req.body.department;
        let email_address = req.body.email_address;
        console.log(adminId)
        console.log(name)
        console.log(departments_csv)
        console.log(email_address)
        let query = "UPDATE `admin` SET `name` = '" + name + "', `departments_csv` = '" + departments_csv + "', `email_address` = '" + email_address + "' WHERE `admin`.`idadmin` = '" + adminId + "'";
        console.log(query)
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteAdmin: (req, res) => {
        let adminId = req.params.idadmin;
        let getImageQuery = 'SELECT image from `admin` WHERE idadmin = "' + adminId + '"';
        let deleteUserQuery = 'DELETE FROM admin WHERE idadmin = "' + adminId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};