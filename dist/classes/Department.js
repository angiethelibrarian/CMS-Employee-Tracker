import { Pool } from 'pg';
// Department class
class Department {
    // Constructor
    constructor(id, name) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.pool = new Pool();
    }
    // Method to print department details
    printDetails() {
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
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
}
export default Department;
