import inquirer from "inquirer";
import Department from "./Department";
import Role from "./Role";
import { Employee } from "./Employee";
import Table from 'cli-table'; // Import the Table class
// Class
class Cli {
    async startCli() {
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
    async viewDepartments() {
        try {
            const departments = await Department.getAll();
            const table = new Table({
                head: ['ID', 'Department Name']
            });
            departments.forEach(dept => {
                table.push([dept.id, dept.name]);
            });
            console.log(table.toString());
        }
        catch (error) {
            console.error('Error fetching departments:', error);
        }
    }
    // View all roles
    async viewRoles() {
        try {
            const roles = await Role.getAll();
            const table = new Table({
                head: ['ID', 'Title', 'Department', 'Salary'],
                colWidths: [10, 20, 20, 15] // Set column widths
            });
            roles.forEach(role => {
                table.push([
                    role.id,
                    role.title,
                    role.department, // Ensure this property exists
                    `$${role.salary.toLocaleString()}`
                ]);
            });
            console.log(table.toString());
        }
        catch (error) {
            console.error('Error fetching roles:', error);
        }
    }
    // View all employees
    async viewEmployees() {
        try {
            const employees = await Employee.getAll();
            const table = new Table({
                head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
                colWidths: [10, 15, 15, 20, 20, 15, 20] // Set column widths
            });
            employees.forEach(emp => {
                table.push([
                    emp.id,
                    emp.first_name, // Ensure property names match
                    emp.last_name, // Ensure property names match
                    emp.title, // Ensure this property exists
                    emp.department, // Ensure this property exists
                    `$${emp.salary.toLocaleString()}`,
                    emp.manager_id || 'None' // Ensure this property exists
                ]);
            });
            console.log(table.toString());
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    // Add a department
    async addDepartment() {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
                validate: (input) => input.trim().length > 0 || 'Department name is required'
            }
        ]);
        const department = new Department(0, name);
        try {
            await department.save(); // Ensure save method is defined in Department class
            console.log(`Added ${name} department to the database`);
        }
        catch (error) {
            console.error('Error adding department:', error);
        }
    }
    // Add a role
    async addRole() {
        try {
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
                    name: 'department',
                    message: 'Which department does this role belong to?',
                    choices: departments.map(dept => ({
                        name: dept.name,
                        value: dept.id
                    }))
                }
            ]);
            const role = new Role(0, answers.title, parseFloat(answers.salary), answers.department);
            await role.save(); // Ensure save method is defined in Role class
            console.log(`Added ${answers.title} role to the database`);
        }
        catch (error) {
            console.error('Error adding role:', error);
        }
    }
    // Add an employee
    async addEmployee() {
        try {
            const roles = await Role.getAll();
            const employees = await Employee.getAll();
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                    validate: (input) => input.trim().length > 0 || 'First name is required'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                    validate: (input) => input.trim().length > 0 || 'Last name is required'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role?",
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: [
                        { name: 'None', value: null },
                        ...employees.map(emp => ({
                            name: `${emp.firstName} ${emp.lastName}`, // Ensure property names match
                            value: emp.id
                        }))
                    ]
                }
            ]);
            const employee = new Employee(0, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
            await employee.save(); // Ensure save method is defined in Employee class
            console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
        }
        catch (error) {
            console.error('Error adding employee:', error);
        }
    }
    // Update an employee role
    async updateEmployeeRole() {
        try {
            const employees = await Employee.getAll();
            const roles = await Role.getAll();
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee\'s role do you want to update?',
                    choices: employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`, // Ensure property names match
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
            export default Cli;
            // Assuming you have an updateRole method in your Employee class
            const employee = new Employee(answers.employeeId, '', '', // These values won't be used for the update
            answers.roleId, null);
            //       //Call the updateRole method on the employee instance
            await employee.updateRole(answers.roleId);
            console.log('Updated employee\'s role');
        }
        catch (error) {
            console.error('Error updating employee role:', error);
        }
    }
}
