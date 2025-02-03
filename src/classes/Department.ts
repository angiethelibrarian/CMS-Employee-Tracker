import pg from 'pg';
const { Pool } = pg;


// Department class
class Department {
  // id?: number;
  // name?: string;
  private pool: any;

  // Constructor
  constructor() {
    // this.id = id;
    // this.name = name;
    this.pool = new Pool();
  }

  // Method to print department details
  printDetails(data: any): void {
    // console.log(`Department ID: ${this.id}`);
    // console.log(`Department Name: ${this.name}`);
    console.table(data);
  }

  // Method to query the database
  async queryDatabase(query: string, params: any[]): Promise<void> {
    try {
      const result = await this.pool.query(query, params);
      // console.log('Query Result:', result.rows);
      console.table(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
    }
  }
  async getAll(): Promise<any> {
    return this.queryDatabase("SELECT * FROM department", [])
  } 
  
  async add(name: string) {
    return this.queryDatabase("INSERT INTO department(name) VALUES ($1)", [name])
  }
}

export default Department;