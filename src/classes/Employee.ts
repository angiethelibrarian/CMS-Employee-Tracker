// Assuming Role is defined as follows. Replace with your actual Role definition.
interface Role {
  title: string;
  salary: number;
  role: string;
  departmentId: number;
}

// Employee class
class Employee {
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
    managerId: number | null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
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
    console.log(`Manager ID: ${this.managerId !== null ? this.managerId : 'No manager'}`);

    if (this.role) {
      console.log(`Title: ${this.role.title}`);
      console.log(`Salary: $${this.role.salary}`);
    }

    if (this.manager) {
      console.log(`Manager: ${this.manager.getFullName()}`);
    }
  }
}

export { Employee };