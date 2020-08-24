const mysql = require("mysql");
const inquirrer = require("inquirrer"),
const table = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DannyPhantom",
    database: "employees"
  });
  
  function runEmployeeTracker() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Update an Employee's Role",
          "Update an Employee's Manager",
          "View employees by Manager",
          "Delete an Employee"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Add a Department":
            addDepartment();
            break;
  
          case "Add a Role":
            addRole();
            break;
  
          case "Add an Employee":
            addEmployee();
            break;
  
          case "View All Departments":
            viewDepartments();
            break;
  
          case "View All Roles":
            viewRoles();
            break;
  
          case "View All Employees":
            viewEmployees();
            break;
  
          case "Update an Employee's Role":
            updateEmployeeRole();
            break;
  
          case "Update an Employee's Manager":
            updateEmployeeManager();
            break;
  
          case "View employees by Manager":
            viewEmployeesByManager();
            break;
  
          case "Delete an Employee":
            deleteEmployee();
            break;
        }
      });
  }
  
  function addDepartment() {
    inquirer
      .prompt({
        name: "name",
        type: "input",
        message: "What would you like to call the new department?"
      })
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.name
          },
          function(err) {
            if (err) throw err;
            console.log("The new department has been created successfully!");
            runEmployeeTracker();
          }
        );
      });
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the new role?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the yearly salary for the new role?"
        },
        {
          name: "department",
          type: "input",
          message:
            "Which department does the role belong to? (Please enter the department ID)"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
          },
          function(err) {
            if (err) throw err;
            console.log("The new role has been created successfully!");
            runEmployeeTracker();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the new employee's first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the new employee's last name?"
        },
        {
          name: "role",
          type: "input",
          message: "What is the new employee's role? (Please enter the role ID)"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role
          },
          function(err) {
            if (err) throw err;
            console.log("The new employee has been created successfully!");
            runEmployeeTracker();
          }
        );
      });
  }
  
  function viewDepartments() {
    connection.query("select * from department", function(err, result) {
      if (err) throw err;
      console.table(result);
      runEmployeeTracker();
    });
  }
  
  function viewRoles() {
    connection.query("select * from role", function(err, result) {
      if (err) throw err;
      console.table(result);
      runEmployeeTracker();
    });
  }
  
  function viewEmployees() {
    connection.query("select * from employee", function(err, result) {
      if (err) throw err;
      console.table(result);
      runEmployeeTracker();
    });
  }
  
  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message:
            "Which employee's role would you like to update? (Please enter the employee ID)"
        },
        {
          name: "role",
          type: "input",
          message: "What is the employee's new role? (Please enter the role ID)"
        }
      ])
      .then(function(answer) {
        connection.query(
          "UPDATE employee SET ? where ?",
          [
            {
              role_id: answer.role
            },
            {
              id: answer.employee
            }
          ],
          function(err) {
            if (err) throw err;
            console.log("The employee's role has been updated successfully!");
            runEmployeeTracker();
          }
        );
      });
  }
  
  function updateEmployeeManager() {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message:
            "Which employee's manager would you like to update? (Please enter the employee ID)"
        },
        {
          name: "manager",
          type: "input",
          message: "What is the manager's employee ID?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "UPDATE employee SET ? where ?",
          [
            {
              manager_id: answer.manager
            },
            {
              id: answer.employee
            }
          ],
          function(err) {
            if (err) throw err;
            console.log("The employee's manager has been updated successfully!");
            runEmployeeTracker();
          }
        );
      });
  }
  
  function viewEmployeesByManager() {
    inquirer
      .prompt({
        name: "manager",
        type: "input",
        message:
          "Which manager's employees would you like to view? (Please enter the manager's employee ID)"
      })
      .then(function(answer) {
        connection.query(
          "select * from employee where ?",
          {
            manager_id: answer.manager
          },
          function(err, result) {
            if (err) throw err;
            console.table(result);
            runEmployeeTracker();
          }
        );
      });
  }
  
  function deleteEmployee() {
      inquirer
        .prompt({
          name: "employee",
          type: "input",
          message:
            "Which employee would you like to delete? (Please enter the employee's ID)"
        })
        .then(function(answer) {
          connection.query(
            "DELETE from employee where ?",
            {
              id: answer.employee
            },
            function(err, result) {
              if (err) throw err;
              console.log("Employee has been deleted successfully!");
              runEmployeeTracker();
            }
          );
        });
    }