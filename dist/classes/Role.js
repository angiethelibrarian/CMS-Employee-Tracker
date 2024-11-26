// Role class
class Role {
    // Constructor
    constructor(
    //       id: number,
    //       title: string,
    //       salary: number,
    //       departmentId: number
    ) {
        //   id: number;
        //   title: string;
        //   salary: number;
        //   departmentId: number;
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //       this.id = id;
        //       this.title = title;
        //       this.salary = salary;
        //       this.departmentId = departmentId;
        this.pool = new Pool();
    }
    // Method to print role details
    printDetails(data) {
        //   console.log(`Role ID: ${this.id}`);
        //   console.log(`Title: ${this.title}`);
        //   console.log(`Salary: $${this.salary}`);
        //   console.log(`Department ID: ${this.departmentId}`);
        console.table(data);
    }
}
// Method to query the role
//   async queryRole(data: any): Promise<void> {
//     try {
//       const result = await this.pool.role();
//       console.log('Role Result:', result.rows);
//     } catch (error) {
//       console.error('Role query error:', error);
//     }
//   }
async;
getAll();
{
    return this.queryRole("SELECT * FROM role", []);
}
async;
add(title, string, salary, number, department);
{
    return this.queryRole("INSERT INTO role(name) VALUES ($1)", []);
}
export default Department;
export default Role;
