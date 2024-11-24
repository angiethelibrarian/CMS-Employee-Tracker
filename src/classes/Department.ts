import inquirer from "inquirer";
import { Pool } from 'pg';


// Department class
class Department {
  // Declare properties
  save(): void;
  id: number;
  name: string;

  // Constructor
  constructor(
      id: number,
      name: string
  ) {
      this.id = id;
      this.name = name;
  }

  // Method to print department details
  printDetails(): void {
      console.log(`Department ID: ${this.id}`);
      console.log(`Department Name: ${this.name}`);
  }

  const pool = new Pool();

  try {
    const result = await pool.query('select $1::text as name', ['brianc']);
    console.log('hello from', result.rows[0]);
} catch (error) {
    console.error('Database query error:', error);
}

  // try {
  //   const result = await Department.query('select $1::text as name', ['brianc'])
  //   console.log('hello from', result.rows[0])
  // }
  
// }

export default Department;
