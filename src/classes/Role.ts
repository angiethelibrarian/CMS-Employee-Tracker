import inquirer from "inquirer";

// Role class
class Role {
  // Declare properties
  id: number;
  title: string;
  salary: number;
  departmentId: number;

  // Constructor
  constructor(
      id: number,
      title: string,
      salary: number,
      departmentId: number
  ) {
      this.id = id;
      this.title = title;
      this.salary = salary;
      this.departmentId = departmentId;
  }

  // Method to print role details
  printDetails(): void {
      console.log(`Role ID: ${this.id}`);
      console.log(`Title: ${this.title}`);
      console.log(`Salary: $${this.salary}`);
      console.log(`Department ID: ${this.departmentId}`);
      }
  }

  export default Role;