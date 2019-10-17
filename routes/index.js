module.exports = {
    getHomePage: (req, res) => {
            res.render('index.ejs', {
                title: "Welcome to Presenta | View Admins"
                ,admins: []
            });
        },
        getAdminHome: (req, res) => {
            let query = "SELECT * FROM `admin` ORDER BY idadmin ASC"; // query database to get all the Adminss
    
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
                console.log(req.headers)
                res.format( 
                    {
                        'text/plain': function() {
                            let response_str = '';
                            result.forEach((item, index) => {
                                response_str = response_str + "name: " + item.name + ", email_address: " + item.email_address + ", departments_csv: " + item.departments_csv
                            });
                            res.status(200).send(response_str)
                        },
                        'text/html': function() {
                            res.render('index.ejs', {
                                title: "Welcome to Presenta | View Admins"
                                ,admins: result
                            });
                        },
                        'application/json': function() {
                            var response_list = [];
                            result.forEach((item, index) => {
                                response_list.push({"name": item.name, "email_address": item.email_address, "departments_csv": item.departments_csv});
                            });
                            response_json = {"admins": response_list}
                            res.status(200).json(response_json)
                        },
                        'default': function() {
                            res.render('index.ejs', {
                                title: "Welcome to Presenta | View Admins"
                                ,admins: result
                            });
                        }
                    }
                )
            });
        }
    };
