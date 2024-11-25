import inquirer from "inquirer";
import { Pool } from 'pg';

// Department class
class Department {
  id: number;
  name: string;
  private pool: Pool;

  // Constructor
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.pool = new Pool();
  }

  // Method to print department details
  printDetails(): void {
    console.log(`Department ID: ${this.id}`);
    console.log(`Department Name: ${this.name}`);
  }

  // Method to query the database
  async queryDatabase(query: string, params: any[]): Promise<void> {
    try {
      const result = await this.pool.query(query, params);
      console.log('Query Result:', result.rows);
    } catch (error) {
      console.error('Database query error:', error);
    }
  }
}
export default Department;