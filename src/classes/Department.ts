// Importing Vehicle and Wheel classes
import inquirer from "inquirer";

// Department class
class Department {
  // Declare properties
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
}
