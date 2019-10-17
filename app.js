const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const querystring = require('querystring');

const {getHomePage, getAdminHome} = require('./routes/index');
const {addAdminPage, addAdmin, deleteAdmin, editAdmin, editAdminPage} = require('./routes/admin');
const studentRoutes = require('./routes/api/student');
const teacherRoutes = require('./routes/api/teacher');
const departmentRoutes = require('./routes/api/department');
const subjectRoutes = require('./routes/api/subject');
const attendanceRoutes = require('./routes/api/attendance');
const adminRoutes = require('./routes/api/admin');
const teacherEnrollmentRoutes = require('./routes/api/teacher_enrollment');
const studentEnrollmentRoutes = require('./routes/api/student_enrollment');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Welcome1',
    database: 'attendance_register'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use('/students', studentRoutes) ;
app.use('/teacher', teacherRoutes) ;
app.use('/department', departmentRoutes) ;
app.use('/subject', subjectRoutes) ;
app.use('/attendance', attendanceRoutes) ;
app.use('/admin', adminRoutes) ;
app.use('/teacherenrollment', teacherEnrollmentRoutes) ;
app.use('/studentenrollment', studentEnrollmentRoutes) ;

// routes for the app

app.get('/', getHomePage);
app.get('/admins', getAdminHome);
app.get('/admins/add', addAdminPage);
app.get('/admins/edit/:idadmin', editAdminPage);
app.get('/admins/delete/:idadmin', deleteAdmin);
app.post('/admins/add', addAdmin);
app.post('/admins/edit/:idadmin', editAdmin);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
