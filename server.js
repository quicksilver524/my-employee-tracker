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
          "View All Roles",
          "View Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
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
        case "Update an Employee Role":
          UpdateEmployeeRoles();
          break;
        case "Quit":
          return Quit();
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
            return Quit();
            break;
        }
      });
  });
}
function viewAllRoles() {
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
            return Quit();
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
            return Quit();
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
      db.query(
        "INSERT INTO department(department_name) VALUES (?)",
        [response.department_name],
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
                  return Quit();
              }
            });
        }
      );
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
        [response.title, response.salary, response.department_id],
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
                  return Quit();
              }
            });
        }
      );
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
        ],
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
                  return Quit();
              }
            });
        }
      );
    });
}
function UpdateEmployeeRoles() {
  let employeeID = [];
  let employeeRoleID = [];
  let employeeQuery = "SELECT * FROM employee";
  let employeeNames = [];
  let employeeRoles = [];
  let roleQuery = "SELECT * FROM roles";

  db.query(employeeQuery, function (err, res) {
    if (err) throw err;
    res.forEach((employee) => {
      employeeNames.push(employee.first_name + " " + employee.last_name);
      employeeID.push(employee.id);
    });
    console.log(employeeNames, employeeID);

    db.query(roleQuery, function (err, res) {
      if (err) throw err;
      res.forEach((roles) => {
        employeeRoles.push(roles.title);
        employeeRoleID.push(roles.id);
      });
      console.log(employeeRoles, employeeRoleID);

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "Select an employee to update their role.",
            choices: employeeNames,
          },
          {
            type: "list",
            name: "roles",
            message: "Select the role you want to assign to the employee.",
            choices: employeeRoles,
          },
        ])
        .then(function (response) {
          let employeeIndex = employeeNames.indexOf(response.employeeName);
          let roleIndex = employeeRoles.indexOf(response.roles);
          let employeeid = employeeID[employeeIndex];
          let roleID = employeeRoleID[roleIndex];

          db.query(
            `UPDATE employee SET roles_id = ? WHERE id = ?`,
            [roleID, employeeid],
            (err, data) => {
              if (err) throw err;
              console.log("Updated in the database");
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
                      return Quit();
                  }
                });
            }
          );
        });
    });
  });
}

function Quit() {
  console.log("Goodbye!");
  process.exit();
}
