use tracker_employee;

INSERT INTO Department
    (dep_name)
    VALUES
    ('Egineer'),
    ('Software Engineer'),
    ('Chef'),
    ('Accountant'),
    ('Lawyer');

INSERT INTO Roles
    (title, salary, iddepartment)
VALUES
    ('Mechanical Engineer', 80000.21, 1),
    ('Full Stack', 78000.18 1),
    ('Culinary', 108000.13, 2),
    ('Personal Accountant', 123000.21, 2),
    ('Corprate Lawyer', 110800.21, 3);

INSERT INTO Employee
    (first_name, last_name, idrole, manager_id)
VALUES
    ('Joe', 'Smith', 2, 3),
    ('Jim', 'Beam', 2, NULL),
    ('Jose', 'Cuervo', 2, 2),
    ('Johnny', 'Walker', 2, NULL),
    ('jame', 'rson', 2, 1);
