import inquirer from "inquirer";

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
  try {
    const result = await Department.query('select $1::text as name', ['brianc'])
    console.log('hello from', result.rows[0])
  }
  
}

export default Department;
