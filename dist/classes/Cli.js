import inquirer from "inquirer";
import Department from "./Department.js";
import Role from "./Role.js";
import { Employee } from "./Employee.js";
// Class
class Cli {
    // Constructor
    constructor() {
        Object.defineProperty(this, "department", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "employee", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.department = new Department();
        this.role = new Role();
        // Creating a dummy employee for now; you might want to manage Employees differently
        this.employee = new Employee(0, "", "", 0, null); // Provide default values to match constructor
    }
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
            try {
                const actions = {
                    'View all departments': () => this.viewDepartments(),
                    'View all roles': () => this.viewRoles(),
                    'View all employees': () => this.viewEmployees(),
                    'Add a department': () => this.addDepartment(),
                    'Add a role': () => this.addRole(),
                    'Add an employee': () => this.addEmployee(),
                    // 'Update an employee role': () => this.updateEmployeeRole(), TO DO: implement later
                    'Exit': () => { exit = true; return Promise.resolve(); }
                };
                if (actions[choice])
                    await actions[choice]();
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    // Helper to display list with printing
    async displayList(title, items, printFunction) {
        console.log(`\n${title}:`);
        items.forEach(printFunction);
        console.log();
    }
    async viewDepartments() {
        try {
            const departments = await this.department.getAll();
            this.displayList('Departments', departments, ({ id, name }) => console.log(`ID: ${id} | Name: ${name}`));
        }
        catch (error) {
            console.log(error);
        }
    }
    async viewRoles() {
        try {
            const roles = await this.role.getAll();
            this.displayList('Roles', roles, (role) => console.log(`ID: ${role.id} | Title: ${role.title} | Department: ${role.department} | Salary: $${role.salary.toFixed(2)}`));
        }
        catch (error) {
            console.log(error);
        }
    }
    async viewEmployees() {
        try {
            const employees = await this.employee.getAll(); // Assuming this returns an array
            this.displayList('Employees', employees, ({ id, firstName, lastName, role, managerId }) => console.log(`ID: ${id} | Name: ${firstName} ${lastName} | Title: ${role?.title} | ` +
                `Department: ${role?.departmentId} | Salary: $${role?.salary.toFixed(2)} | Manager ID: ${managerId || 'None'}`));
        }
        catch (error) {
            console.log(error);
        }
    }
    async addDepartment() {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Department name:',
                validate: (input) => input.trim().length > 0 || 'Department name is required.',
            },
        ]);
        try {
            await this.department.add(name);
            console.log(`\nAdded department: ${name.trim()}\n`);
            await this.viewDepartments();
        }
        catch (error) {
            console.log(error);
        }
    }
    async addRole() {
        const { title, salary, department } = await inquirer.prompt([
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
                choices: await this.department.getAll().then(depts => depts.map((dept) => ({ name: dept.name, value: dept.id })))
            }
        ]);
        try {
            await this.role.add(title, parseFloat(salary), department);
            console.log(`\nAdded role: ${title.trim()}\n`);
            await this.viewRoles();
        }
        catch (error) {
            console.log(error);
        }
    }
    async addEmployee() {
        try {
            const roles = await this.role.getAll(); // Fixed to use this.role.getAll()
            const employees = await this.employee.getAll();
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
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
                    choices: roles.map((role) => ({ name: role.title, value: role.id }))
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: "Who is the employee's manager?",
                    choices: [
                        { name: 'None', value: null },
                        ...employees.map((emp) => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id }))
                    ]
                }
            ]);
            const newEmployee = new Employee(0, firstName.trim(), lastName.trim(), roleId, managerId); // Use constructor correctly
            await newEmployee.save(); // Assuming save is a method in Employee class
            console.log(`\nAdded employee: ${firstName.trim()} ${lastName.trim()}\n`);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default Cli;
