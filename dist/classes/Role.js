import { Pool } from "pg"; // Assuming you're using pg package for PostgreSQL
// Role class
class Role {
    // Constructor
    constructor() {
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pool = new Pool();
    }
    // Method to print role details
    printDetails(data) {
        console.table(data);
    }
    // Method to query the role
    async queryRole(query, params) {
        try {
            const result = await this.pool.query(query, params);
            return result; // Return the result from the query
        }
        catch (error) {
            console.error('Role query error:', error);
            throw error; // Rethrow the error for further handling
        }
    }
    async getAll() {
        return this.queryRole("SELECT * FROM role", []);
    }
    async add(title, salary, departmentId) {
        return this.queryRole("INSERT INTO role(title, salary, departmentId) VALUES ($1, $2, $3)", [title, salary, departmentId]);
    }
}
export default Role;
