const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

/////////// Start server after DB connection/////////////
db.connect((err) => {
  if (err) throw err;
  start();
});
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select an Option.",
        choices: [
          "View All Employees",
          "View Roles",
          "View Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}
function viewAllEmployees() {
  const request = "SELECT * FROM employee";
  db.query(request, function (err, res) {
    if (err) throw err;
    console.log("Viewing All Employees");
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an Option.",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        switch (answer.choice) {
          case "Main Menu":
            start();
            break;
          case "Quit":
            quit();
            break;
        }
      });
  });
}
function viewRoles() {
  let request = "SELECT * FROM roles";
  db.query(request, function (err, res) {
    if (err) throw err;
    console.log("Viewing Roles");
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an Option.",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        switch (answer.choice) {
          case "Main Menu":
            start();
            break;
          case "Quit":
            quit();
            break;
        }
      });
  });
}
function viewDepartments() {
  const request = "SELECT * FROM department";
  db.query(request, function (err, res) {
    if (err) throw err;
    console.log("Viewing Departments");
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an Option.",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        switch (answer.choice) {
          case "Main Menu":
            start();
            break;
          case "Quit":
            quit();
            break;
        }
      });
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Enter the department name",
      },
    ])
    .then(function (response) {
      db.query("INSERT INTO department(department_name) VALUES (?)", [
        response.department_name,
      ]),
        function (err, response) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "choice",
                message: "select an option.",
                choices: ["Main Menu", "Quit"],
              },
            ])
            .then((answer) => {
              switch (answer.choice) {
                case "Main Menu":
                  start();
                  break;
                case "Quit":
                  Quit();
              }
            });
        };
    });
}
function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the role",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department id of the role",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)",
        [response.title, response.salary, response.department_id]
      ),
        function (err, response) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "choice",
                message: "select an option.",
                choices: ["Main Menu", "Quit"],
              },
            ])
            .then((answer) => {
              switch (answer.choice) {
                case "Main Menu":
                  start();
                  break;
                case "Quit":
                  Quit();
              }
            });
        };
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Enter the id of the employee",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter their managers id",
      },
    ])
    .then(function (response) {
      console.log(response);
      db.query(
        `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`,
        [
          response.first_name,
          response.last_name,
          response.roles_id,
          response.manager_id,
        ]
      ),
        (err, response) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "choice",
                message: "select an option.",
                choices: ["Main Menu", "Quit"],
              },
            ])
            .then((answer) => {
              switch (answer.choice) {
                case "Main Menu":
                  start();
                  break;
                case "Quit":
                  Quit();
              }
            });
        };
    });
}
function Quit() {
  console.log("Goodbye!");
  process.exit();
}
