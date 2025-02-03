import pg from 'pg';
const { Pool } = pg;

// Role class
class Role {
  private pool: any;

  // Constructor
  constructor() {
    this.pool = new Pool();
  }

  // Method to print role details
  printDetails(data: any): void {
    console.table(data);
  }

  // Method to query the role
  private async queryRole(query: string, params: any[]): Promise<any> {
    try {
      const result = await this.pool.query(query, params);
      return result; // Return the result from the query
    } catch (error) {
      console.error('Role query error:', error);
      throw error; // Rethrow the error for further handling
    }
  }

  async getAll(): Promise<any> {
    return this.queryRole("SELECT * FROM role", []);
  } 
  
  async add(title: string, salary: number, departmentId: number): Promise<any> {
    return this.queryRole("INSERT INTO role(title, salary, departmentId) VALUES ($1, $2, $3)", [title, salary, departmentId]);
  }
}

export default Role;