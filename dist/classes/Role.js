// Role class
class Role {
    // Constructor
    constructor(id, title, salary, departmentId) {
        // Declare properties
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "salary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "departmentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }
    // Method to print role details
    printDetails() {
        console.log(`Role ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Salary: $${this.salary}`);
        console.log(`Department ID: ${this.departmentId}`);
    }
}
export default Role;
