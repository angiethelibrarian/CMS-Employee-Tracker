import pg from 'pg';
const { Pool } = pg;

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
  pool: any;

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
    this.pool = new Pool();
  }

  // Method to get full name
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private async queryEmployee(query: string, params: any[]): Promise<any> {
    try {
      const result = await this.pool.query(query, params);
      return result; // Return the result from the query
    } catch (error) {
      console.error('Employee query error:', error);
      throw error; // Rethrow the error for further handling
    }
  }
  async getAll(): Promise<any> {
    return this.queryEmployee("SELECT * FROM employee", []);
  } 

  async save(): Promise<any> {
    return this.queryEmployee("INSERT INTO employee(firstName, lastName, roleId, managerId) VALUES ($1, $2, $3, $4)", [this.firstName, this.lastName, this.roleId, this.managerId]);
  }

  // async findById(): Promise<any> {
  //   return this.queryEmployee("")
  // }

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