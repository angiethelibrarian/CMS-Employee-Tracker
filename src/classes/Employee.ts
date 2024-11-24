import inquirer from "inquirer";

// Assuming Role and Manager are defined elsewhere
// class Role {
//   id: number;
//   title: string;
//   salary: number;

//   constructor(id: number, title: string, salary: number) {
//       this.id = id;
//       this.title = title;
//       this.salary = salary;
//   }
// }

class Employee {
  // Declare properties
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  managerId: number | null;
  role?: Role; // Optional role property
  manager?: Employee; // Optional manager property

  // Constructor
  constructor(
      id: number,
      firstName: string,
      lastName: string,
      roleId: number,
      managerId: number | null,
    //   role?: Role, // Optional role parameter
    //   manager?: Employee // Optional manager parameter
  ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.roleId = roleId;
      this.managerId = managerId;
      this.role = role;
      this.manager = manager;
  }

  // Method to get full name
  getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
  }

  // Method to print employee details
  printDetails(): void {
      console.log(`Employee ID: ${this.id}`);
      console.log(`Name: ${this.getFullName()}`);
      console.log(`Role ID: ${this.roleId}`);
      console.log(`Manager ID: ${this.managerId || 'No manager'}`);
      
      if (this.role) {
          console.log(`Title: ${this.role.title}`);
          console.log(`Salary: $${this.role.salary}`);
      }
      
      if (this.manager) {
          console.log(`Manager: ${this.manager.getFullName()}`);
      }
  }
}

// Export all classes
export { Employee };