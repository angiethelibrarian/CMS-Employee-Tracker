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
            value: new Pool()
        });
        this.id = id;
        this.name = name;
    }
    // Method to print department details
    printDetails() {
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
    }
}
try {
    const result = await pool.query('select $1::text as name', ['brianc']);
    console.log('hello from', result.rows[0]);
}
catch (error) {
    console.error('Database query error:', error);
}
export default Department;
