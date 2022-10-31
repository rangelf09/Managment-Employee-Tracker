DROP DATABASE IF EXISTS tracker_employee;
CREATE DATABASE tracker_employee;
USE tracker_employee;


CREATE TABLE Department (
    iddepartment INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL,
);

CREATE TABLE Roles(
    idrole INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2),
    iddepartment INT,
    FOREIGN KEY (iddepartment) REFERENCES Department (iddepartment)
);

CREATE TABLE Employee (
    idemployee INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    idrole INT,
    manager_id INT NULL,
    FOREIGN KEY (idrole) REFERENCES (idrole),
    FOREIGN KEY (manager_id) REFERENCES employee(idemployee)
)
