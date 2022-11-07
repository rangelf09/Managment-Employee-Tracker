const mysql = require('mysql'); 
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');



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

let rolesArray = [];
let deptArray = [];
let managerArray = [];
let employeeArray = [];

class Department {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
};

class Roles {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
};

class Manager {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
};


// adding prompt 
const init = () => {
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

class Emplyoee {
    constructor(name, id, role, salary, department, manager) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.salary = salary;
        this.department = department;
        this.manager = manager;
    }
}

const newManager = () => {
    connection.query(
        "SELECT Employee.first_name, Employee.last_name, Employee.idemployee FROM Employee INNER JOIN Roles ON Roles.idrole = Employee.idrole WHERE role.title =?",['Manager'],
        (err, res) => {
            if (err) throw err;
            const tempMan = res.map((res) => `${res.first_name} ${res.last_name}`);
            managerArray = [];
            for (i = 0; i < res.length; i++) {
                const temp = new Manager (res[i]. idemployee, tempMan[i])
                managerArray.push(temp);
        }
        const temp = new Manager (0, 'none')
        managerArray.push(temp);
})
}

let assignManager = (manager) => {
if(!manager) {return null;}
for (i = 0; i < managerArray.length; i++) {
    if(managerArray[i] === manager) {
        return managerArray.name;
    }
}}

const addEmployees = () => {
    inquirer
    .prompt([
        {
            name: 'fname',
            type: 'input',
            messgae: "What is the employee's first name"
        },
        {
            name: 'lname',
            type: 'input',
            message: "what is the employee's last name"
        },
        {
            name: 'role',
            type: 'list',
            message: "what is the employee's role",
            choices: rolesArray,
        },
        {
            name: 'manager',
            type: 'list',
            message: "Who is your employee's manager?",
            choices: managerArray,
        },
    ])
    .then((response) => {
        if (response.manager === 0) {
            connection.query (
                "INSERT INTO Employee SET ?",
                {
                    first_name: response.fname,
                    last_name: response.lname,
                    idrole: response.role, 
                },
                (err) => {
                    if(err) throw err;
                    console.log('You have added a manager')
                    newManager()
                    init();
                    viewEmployees();
                }
            )
        } else (
            connection.query(
                 'INSERT INTO Employee SET',
                 {
                    first_name: response.fname,
                    last_name: response.lname,
                    idrole: response.role,
                    manager_id: response.manager,
                 },
                 (err) => {
                    if (err) throw err;
                    console.log("Employee has been added");
                    init();
                    viewEmployees();
                 }
            ))
    })
}

let empName = [];

const viewEmployees = () => {
    connection.query(
        'SELECT Employee.idemployee, Employee.first_name, Employee.last_name, Roles.title, Roles.salary, Department.dept_name, Employee.manager_id FROM Employee INNER JOIN Roles ON Employee.idrole = Roles.idrole INNER JOIN department ON Roles.iddepartment = Department.iddepartment',
        (err, res) => {
            if(err) throw err;
            empName = res.map((res) => `${res.first_name} ${res.last_name}`)
            employeeArray = [];
            for(i = 0; i < res.length; i++) {
                let assigned = assignManager(res[i].manager_id);
                const tempEmployee = new Emplyoee (empName[i], res[i].idemployee, res[i].title, res[i].salary, res[i].dept_name, assigned)
                employeeArray.push(tempEmployee);
            }
            console.table(employeeArray);
            start();
        }
    )
}

const updateEmployees = () => {
    inquirer.prompt([
        {
           name: 'name',
           type: 'list',
           message: 'Which employee are we updating',
           choices: employeeArray, 
        },
        {
            name: 'role',
            type: 'list',
            message: 'Which role are we updating',
            choices: rolesArray,
        },
    ])
    .then((response)=>{
        console.log("Employee role has been successufully updated")
        connection.query(
            "UPDATE Employee SET ? WHERE ?",
            [
                {
                    idrole: response.role
                },
                {
                    idemployee: response.name
                }
            ]
        )
        init();
    })
}

const newRoles = () => {
    connection.query(
        "SELECT * FROM Roles", (err, res) => {
            rolesArray = [];
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                const tempRoles = new Roles (res[i].idrole, res[i].title)
                rolesArray.push(tempRoles)
            }
        }
    )
}

const addRoles = () => {
    inquirer
    .prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the new added role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role',
        },
        {
            name: "department",
            type: "list",
            message: 'Which department is this role in?',
            choices: deptArray,
        },
    ])
    .then ((resopnse) => {
        connection.query(
            'INSERT INTO Roles SET ?',
            {
                title: resopnse.name, 
                salary: resopnse.salary,
                iddepartment: response.department,
            },
            (err) => {
                if (err) throw err;
                console.log('Your role as been added');
                newRoles();
                init();
            }
        )
    })
}

const viewRoles = () => {
    connection.query(
        'SELECT Roles.title, Roles.salary, Department.dept_name FROM Roles INNER JOIN Department ON Roles.iddepartment = department.iddepartment', (err, res) =>{
            if(err) throw err;
            console.log('--Roles--');
            console.table(res);
            init();
        }
    )
}


const addDepartments = () => {
    inquirer
    .prompt({
        name: "name",
        type: 'input',
        messgae:"What is the new department name?",
    })
    .then ((response) => {
        connection.query(
            'INSERT INTO Department SET ?',
            {
                name:response.dept_name
            },
            (err) => {
                if (err) throw err;
                console.log ('Department has been added');
                newDept();
                init();
            }
        )
    })
}

const newDept = () => {
    connection.query(
        'SELECT * FROM Department', (err, res) => {
            deptArray = [];
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                const depttemp = new Department (res[i].iddepartment, res[i].dept_name)
                deptArray.push(depttemp)
            }
        }
    )
}


const viewDepartments = () => {
    connection.query(
        'SELECT name FROM Department', (err, res) => {
            if(err) throw err;
            console.log('--Departments--');
            console.table(res);
            init;
        }
    )
}

connection.connect((err) => {
    if (err) throw err;
    start();

})