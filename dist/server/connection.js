//create inital connection to the database using the pg package
import { Pool } from 'pg';
// Connection class
export class Connection {
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
    // Method to query the database
    async queryDatabase(query, params) {
        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        }
        catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}
