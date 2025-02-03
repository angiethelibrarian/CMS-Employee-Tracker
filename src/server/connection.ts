//create inital connection to the database using the pg package
import { Pool } from 'pg';
// Connection class

export class Connection {
  private pool: Pool;

  // Constructor
  constructor() {
    this.pool = new Pool();
  }

  // Method to query the database
  async queryDatabase(query: string, params: any[]): Promise<any> {
    try {
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}