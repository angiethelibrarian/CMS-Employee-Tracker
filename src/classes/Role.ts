import inquirer from "inquirer";

// Role class
class Role {
  // Declare properties
  id: number;
  title: string;
  salary: number;
  departmentId: number;
  department?: Department;  // Optional department reference

  // Constructor
  constructor(
      id: number,
      title: string,
      salary: number,
      departmentId: number,
      department?: Department
  ) {
      this.id = id;
      this.title = title;
      this.salary = salary;
      this.departmentId = departmentId;
      this.department = department;
  }

  // Method to print role details
  printDetails(): void {
      console.log(`Role ID: ${this.id}`);
      console.log(`Title: ${this.title}`);
      console.log(`Salary: $${this.salary}`);
      console.log(`Department ID: ${this.departmentId}`);
      if (this.department) {
          console.log(`Department Name: ${this.department.name}`);
      }
  }
}