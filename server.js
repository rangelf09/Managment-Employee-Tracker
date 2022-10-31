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


// adding prompt 
const begin = () => {
    inquirer.createPromptModule({
        name: 'startQuestions',
        type: 'list', 
        message: 'What would you like to do?',
        choices:['View all Employees', 'Add Employees','Update Employees','View all Roles', 'Add Roles', 'View all Departments', 'Add Departnments'],
    })
    .then((answer) => {
        if(answer.startQuestions === 'View all Employees') {
            viewEmployees();
        } else if(answer.startQuestions === 'Add Employees'){
            addEmployees();
        } else if(answer.startQuestions === 'Update Employees'){
            updateEmployees();
        }else if(answer.startQuestions === 'View all Roles'){
            viewRoles();
        }else if(answer.startQuestions === 'Add Roles'){
            addRoles();
        }else if(answer.startQuestions === 'View all Departments'){
            viewDepartments();
        }else if(answer.startQuestions === 'Add Departnments'){
            addDepartments();
        }
    })
}