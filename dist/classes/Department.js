import { Pool } from 'pg';
// Department class
class Department {
    // Constructor
    constructor() {
        // id?: number;
        // name?: string;
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // this.id = id;
        // this.name = name;
        this.pool = new Pool();
    }
    // Method to print department details
    printDetails(data) {
        // console.log(`Department ID: ${this.id}`);
        // console.log(`Department Name: ${this.name}`);
        console.table(data);
    }
    // Method to query the database
    async queryDatabase(query, params) {
        try {
            const result = await this.pool.query(query, params);
            console.log('Query Result:', result.rows);
        }
        catch (error) {
            console.error('Database query error:', error);
        }
    }
    async getAll() {
        return this.queryDatabase("SELECT * FROM department", []);
    }
    async add(name) {
        return this.queryDatabase("INSERT INTO department(name) VALUES ($1)", [name]);
    }
}
export default Department;
