const inquirer = require('inquirer');
const mysql = require('mysql2');
const util = require('util');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


const menu = [
  {
    type: 'list',
    name: 'choice',
    message: 'What do you want to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add a role', 'Add an employee', 'Update employee role']
  }
];
const newDepartmentQuestions = [
  {
    type: 'input',
    name: 'id',
    message: 'What is the id of the new department?',
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  }
];
const newRoleQuestions = [
  {
    type: 'input',
    name: 'id',
    message: 'What is the id of the new role?'
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the role?'
  },
  {
    type: 'input',
    name: 'dep_id',
    message: 'What is the department id for this role?'
  }
];
const newEmployeeQuestions = [
  {
    type: 'input',
    name: 'id',
    message: 'What is the id of the new employee?'
  },
  {
    type: 'input',
    name: 'first',
    message: 'What is the employees first name?'
  },
  {
    type: 'input',
    name: 'last',
    message: 'Last name?'
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'what is the id of their role?'
  },
  {
    type: 'input',
    name: 'man_id',
    message: 'What is the id of their manager?'
  }
];
const updateEmployeeQuestions = [
  {
    type: 'input',
    name: 'id',
    message: 'What is the employee id?'
  },
  {
    type: 'input',
    name: 'newRole',
    message: 'What is their new role?'
  }
];
function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    init();
  })
};
function viewRoles() {
  db.query('SELECT * FROM roles', function (err, results) {
    console.log(results);
    init();
  })
};
function viewEmployees() {
  db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
    init();
  })

};
function addDepartment() {
  inquirer.prompt(newDepartmentQuestions)
    .then((response) => {
      db.query(`INSERT INTO department (id, name)
      VALUES  (${response.id}, "${response.name}");`, function (err, results) {
        viewDepartments();
      })
    })
};
function addRole() {
  inquirer.prompt(newRoleQuestions)
    .then((response) => {
      db.query(`INSERT INTO roles (id, title, department_id)
      VALUES  (${response.id}, "${response.title}", ${response.dep_id});`, function (err, results) {
        viewRoles();
      })
    })
};
function addEmployee() {
  inquirer.prompt(newEmployeeQuestions)
    .then((response) => {
      db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
      VALUES  (${response.id}, "${response.first}", "${response.last}", ${response.role_id}, ${response.man_id});`, function (err, results) {
        viewEmployees();
      })
    })

};
function updateEmployee() {
  inquirer.prompt(updateEmployeeQuestions)
    .then((response) => {
      db.query(`UPDATE employees
      SET role_id = ${response.newRole}
      WHERE id = ${response.id};`, function (err, results) {
        viewEmployees();
      })

    })

};
function init() {
  inquirer.prompt(menu)
    .then((response) => {
      if (response.choice == 'View all departments') {
        viewDepartments();
      }
      if (response.choice == 'View all roles') {
        viewRoles();
      }
      if (response.choice == 'View all employees') {
        viewEmployees();
      }
      if (response.choice == 'Add department') {
        addDepartment();
      }
      if (response.choice == 'Add a role') {
        addRole();
      }
      if (response.choice == 'Add an employee') {
        addEmployee();
      }
      if (response.choice == 'Update employee role') {
        updateEmployee();
      }
    })
};
init();



