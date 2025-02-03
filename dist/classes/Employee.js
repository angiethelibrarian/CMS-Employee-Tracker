import pg from 'pg';
const { Pool } = pg;
// Employee class
class Employee {
    // Constructor
    constructor(id, firstName, lastName, roleId, managerId) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "roleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "managerId", {
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
        }); // Optional role property
        Object.defineProperty(this, "manager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // Optional manager property
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
        this.pool = new Pool();
    }
    // Method to get full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    async queryEmployee(query, params) {
        try {
            const result = await this.pool.query(query, params);
            return result; // Return the result from the query
        }
        catch (error) {
            console.error('Employee query error:', error);
            throw error; // Rethrow the error for further handling
        }
    }
    async getAll() {
        return this.queryEmployee("SELECT * FROM employee", []);
    }
    async save() {
        return this.queryEmployee("INSERT INTO employee(firstName, lastName, roleId, managerId) VALUES ($1, $2, $3, $4)", [this.firstName, this.lastName, this.roleId, this.managerId]);
    }
    // async findById(): Promise<any> {
    //   return this.queryEmployee("")
    // }
    // Method to print employee details
    printDetails() {
        console.log(`Employee ID: ${this.id}`);
        console.log(`Name: ${this.getFullName()}`);
        console.log(`Role ID: ${this.roleId}`);
        console.log(`Manager ID: ${this.managerId !== null ? this.managerId : 'No manager'}`);
        if (this.role) {
            console.log(`Title: ${this.role.title}`);
            console.log(`Salary: $${this.role.salary}`);
        }
        if (this.manager) {
            console.log(`Manager: ${this.manager.getFullName()}`);
        }
    }
}
export { Employee };
