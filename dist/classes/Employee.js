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
    // Constructor
    constructor(id, firstName, lastName, roleId, managerId, role, // Optional role parameter
    manager // Optional manager parameter
    ) {
        // Declare properties
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "roleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "managerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // Optional role property
        Object.defineProperty(this, "manager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // Optional manager property
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
        this.role = role;
        this.manager = manager;
    }
    // Method to get full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    // Method to print employee details
    printDetails() {
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
export { Employee, Role };
