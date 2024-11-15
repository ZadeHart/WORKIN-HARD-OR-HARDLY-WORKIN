import { pool } from './connection.js'

export default class Db {
    constructor() {}

    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } finally {
            client.release();
        }
    }

    findAllEmployees() {
        return this.query(
           "SELECT * FROM employee"
            // "SELECT employee.id, employee.first_name. employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findAllPossibleManagers(employeeId: number) {
        return this.query(
            'SELECT id, first_name, last_name FROM employee WHERE id != $1',
            [employeeId]
        );
    }

    createEmployee(employee: any) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        )
    }

    removeEmployee(employeeId: number) {
        return this.query('DELETE FROM employee WHERE id = $1', [employeeId]);
    }

    updateEmployeeRole(employeeId: number, roleId: number) {
        return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
            roleId,
            employeeId
        ]);
    }

    updateEmployeeManager(employeeId: number, managerId: number) {
        return this.query('UPDATE employee SET manager_id = $1 WHERE id = $2',[
            managerId,
            employeeId,
        ]);
    }
           // 'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id'

    findAllRoles() {
        return this.query(
            "SELECT * FROM role;"
        );
    }

    createRole(role: any) {
        const { title, salary, department_id } = role;
        return this.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
    }

    removeRole(roleId: number) {
        return this.query('DELETE FROM role WHERE id = $1', [roleId]);
    }

    findAllDepartments() {
        return this.query('SELECT department.id, department.name FROM department;');
    }

    viewDepartmentBudgets() {
        return this.query(
            'SELECT deparment.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id ='
        );
    }

    createDepartment(department: any) {
        return this.query('INSERT INTO department (name) VALUES ($1)', [
            department.name,
        ]);
    }

    removeDepartment(departmentId: number) {
        return this.query('DELETE FROM department WHERE id = $1', [departmentId]);
    }

    findAllEmployeesByDepartment(departmentId: number) {
        return this.query(
            'SELECT employee.id, employee.first_name, role.title FROM employee LEFT JOIN role on employee.role_id = role'
            [departmentId]
        );
    }

    findAllEmployeesByManager(managerId: number) {
        return this. query(
            'SELECT employee.id, employee.first_name, employee.first_name, department.name AS department, role.title FROM employee JOIN LEFT'
            [managerId]
        );
    }
    
}