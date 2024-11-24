import inquirer from "inquirer.js";
import Department from "./Department.js";
import Role from "./Role.js"; 
import { Employee } from "./Employee.js";

//Class
class Cli {
  async startCli(): Promise<void> {
    let exit = false;
    while (!exit) {
      const { choice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
          ]
        }
      ]);

      switch (choice) {
        case 'View all departments':
          await this.viewDepartments();
          break;
        case 'View all roles':
          await this.viewRoles();
          break;
        case 'View all employees':
          await this.viewEmployees();
          break;
        case 'Add a department':
          await this.addDepartment();
          break;
        case 'Add a role':
          await this.addRole();
          break;
        case 'Add an employee':
          await this.addEmployee();
          break;
        case 'Update an employee role':
          await this.updateEmployeeRole();
          break;
        case 'Exit':
          exit = true;
          break;
      }
    }
  }

  // View all departments
  async viewDepartments(): Promise<void> {
    const departments = await Department.getAll();
    const table = new Table({
      head: ['ID', 'Department Name']
    });

    departments.forEach(dept => {
      table.push([dept.id, dept.name]);
    });

    console.log(table.toString());
  }

  // View all roles
  async viewRoles(): Promise<void> {
    const roles = await Role.getAll();
    const table = new Table({
      head: ['ID', 'Title', 'Department', 'Salary']
    });

    roles.forEach(role => {
      table.push([
        role.id,
        role.title,
        role.department_name,
        `$${role.salary.toLocaleString()}`
      ]);
    });

    console.log(table.toString());
  }

  // View all employees
  async viewEmployees(): Promise<void> {
    const employees = await Employee.getAll();
    const table = new Table({
      head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager']
    });

    employees.forEach(emp => {
      table.push([
        emp.id,
        emp.first_name,
        emp.last_name,
        emp.title,
        emp.department_name,
        `$${emp.salary.toLocaleString()}`,
        emp.manager_name || 'None'
      ]);
    });

    console.log(table.toString());
  }

  // Add a department
  async addDepartment(): Promise<void> {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
        validate: (input) => input.trim().length > 0 || 'Department name is required'
      }
    ]);

    const department = new Department(0, name);
    await department.save();
    console.log(`Added ${name} department to the database`);
  }

  // Add a role
  async addRole(): Promise<void> {
    const departments = await Department.getAll();

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
        validate: (input) => input.trim().length > 0 || 'Role title is required'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid salary'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department does this role belong to?',
        choices: departments.map(dept => ({
          name: dept.name,
          value: dept.id
        }))
      }
    ]);

    const role = new Role(0, answers.title, parseFloat(answers.salary), answers.departmentId);
    await role.save();
    console.log(`Added ${answers.title} role to the database`);
  }

  // Add an employee
  async addEmployee(): Promise<void> {
    const roles = await Role.getAll();
    const employees = await Employee.getAll();

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        validate: (input) => input.trim().length > 0 || 'First name is required'
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: (input) => input.trim().length > 0 || 'Last name is required'
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: [
          { name: 'None', value: null },
          ...employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
          }))
        ]
      }
    ]);

    const employee = new Employee(
      0,
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId
    );
    await employee.save();
    console.log(`Added ${answers.firstName} ${answers.lastName} to the database`);
  }

  // Update an employee role
  async updateEmployeeRole(): Promise<void> {
    const employees = await Employee.getAll();
    const roles = await Role.getAll();

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee\'s role do you want to update?',
        choices: employees.map(emp => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id
        }))
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to assign to the selected employee?',
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      }
    ]);

    // Assuming you have an updateRole method in your Employee class
    const employee = new Employee(
      answers.employeeId,
      '', '', // These values won't be used for the update
      answers.roleId,
      null
    );
    await employee.updateRole(answers.roleId);
    console.log('Updated employee\'s role');
  }
}
export default Cli;