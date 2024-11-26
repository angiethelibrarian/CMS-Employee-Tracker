import inquirer from "inquirer";
import Department from "./Department";
import Role from "./Role";
import { Employee } from "./Employee";
// Class
class Cli {
    // role: Role;
    // employee: Employee;
    // Constructor
    constructor() {
        Object.defineProperty(this, "department", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.department = new Department();
        // this.role = new Role();
        // this.employee = new Employee();
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
            catch (error) {
                console.log(error);
            }
        }
    }
    // View all departments
    async viewDepartments() {
        try {
            const departments = await this.department.getAll();
            console.log('Departments:');
            // departments.forEach(({ id, name }) => console.log(`ID: ${id} | Name: ${name}`));
            this.department.printDetails(departments);
        }
        catch (error) {
            console.log(error);
        }
    }
    // View all roles
    async viewRoles() {
        try {
            const roles = await Role.getAll();
            console.log('\nRoles:');
            roles.forEach(({ id, title, department, salary }) => console.log(`ID: ${id} | Title: ${title} | Department: ${department} | Salary: $${salary.toFixed(2)}`));
            console.log();
        }
        catch (error) {
            console.log(error);
        }
    }
    // View all employees
    async viewEmployees() {
        try {
            const employees = await Employee.getAll();
            console.log('\nEmployees:');
            employees.forEach(({ id, first_name, last_name, title, department, salary, manager_id }) => console.log(`ID: ${id} | Name: ${first_name} ${last_name} | Title: ${title} | ` +
                `Department: ${department} | Salary: $${salary.toFixed(2)} | Manager ID: ${manager_id || 'None'}`));
            console.log();
        }
        catch (error) {
            console.log(error);
        }
    }
    // Add a department
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
            const departments = await this.department.getAll();
            console.log('Departments:');
            // departments.forEach(({ id, name }) => console.log(`ID: ${id} | Name: ${name}`));
            this.department.printDetails(departments);
        }
        catch (error) {
            console.log(error);
        }
    }
    // Add a role
    async addRole() {
        const { title, salary, department } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
                validate: (input) => input.trim().length > 0 || 'Role title is required'
            },
        ]);
        {
            type: 'input',
                name;
            'salary',
                message;
            'What is the salary for this role?',
                validate;
            (input) => !isNaN(parseFloat(input)) || 'Please enter a valid salary';
        }
        {
            type: 'list',
                name;
            'department',
                message;
            'Which department does this role belong to?',
                choices;
            departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }));
        }
    }
    ;
}
try {
    await this.role.add(title, salary, department);
    console.log(`\nAdded role: ${title.trim()}\n`);
    console.log(`\nAdded role: ${salary.trim()}\n`);
    console.log(`\nAdded role: ${department.trim()}\n`);
}
finally {
}
const role = await this.role.getAll();
console.log('Role:');
// role.forEach(({ title, salary, department }) => console.log(`Title: ${title} | Salary: ${salary} | Department: ${department}`));
this.role.printDetails(role);
try {
}
catch (error) {
    console.log(error);
}
await new Role(0, title.trim(), parseFloat(salary), department).save();
console.log(`\nAdded role: ${title.trim()}\n`);
try { }
catch (error) {
    console.log(error);
}
// Add an employee
async;
addEmployee();
Promise < void  > {
    try: {
        const: roles = await Role.getAll(),
        const: employees = await Employee.getAll(),
        const: { firstName, lastName, roleId, managerId } = await inquirer.prompt([
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
                        name: `${emp.firstName} ${emp.lastName}`, // Ensure property names match
                        value: emp.id
                    }))
                ]
            }
        ]),
        await, new: Employee(0, firstName.trim(), lastName.trim(), roleId, managerId).save(),
        console, : .log(`\nAdded employee: ${firstName.trim()} ${lastName.trim()}\n`)
    }, catch(error) {
        console.log(error);
    }
};
async;
updateEmployeeRole();
Promise < void  > {
    try: {
        const: employees = await Employee.getAll(),
        const: roles = await Role.getAll(),
        const: { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: "Select the employee to update:",
                choices: employees.map(({ id: value, first_name: string, last_name: string }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                })),
            },
            {
                type: 'list',
                name: 'role_id',
                message: "Select the new role:",
                choices: roles.map(({ id, title }) => ({ name: title, value: id })),
            },
        ]),
        const: employee = await Employee.findById(employee_id),
        if(employee) {
            await employee.updateRole(role_id);
            console.log('\nEmployee role updated successfully.\n');
        }, else: {
            console, : .error('\nEmployee not found.\n')
        }
    }, catch(error) {
        console.log(error);
    }
};
export default Cli;
