const mysql = require('mysql'); 
const inquirer = require('inquirer');



// creating connection to mysql

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rangel24',
    database: 'tracker_employee'

},
console.log(`connected to the tracker_employee database`)
);
connect.connect((err) =>{
    if(err) {
        console.log(err);
        res.status(500);
        return res.send("There was an error connecting to the database.");
    } console.log("You're Connected!");
});