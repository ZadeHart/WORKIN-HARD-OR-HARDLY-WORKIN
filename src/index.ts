import inquirer from 'inquirer';
import Db from './db/index.js';

const db = new Db();

init();

function init() {
    // const logoText = logo({ name: 'Employee Manager' }).render();

    // console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES',
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT',
                },
                {
                    name: 'View All Employess By Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER',
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE',
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER',
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLE',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE',
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT',
                },
                {
                    name: 'View Total Utilized Budget By Department',
                    value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT',
                },
                {
                    name: 'Quit',
                    value: 'QUIT',
                },
            ],
        },
    ]).then((res) => {
        const choice = res.choice;
        switch (choice) {
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                viewEmployeesByDepartment();
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                viewEmployeesByManager();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'REMOVE_EMPLOYEE':
                removeEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeManager();
                break;
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'REMOVE_DEPARTMENT':
                removeDepartment();
                break;
            case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
                viewUtilizedBudgetByDepartment();
                break;
            case 'VIEW_ROLE':
                viewRole();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            // case 'REMOVE_ROLE':
            //     removeRole();
            //     break;
                default:
                quit();
        }
    })
}

function quit() {
    process.exit()
}

async function viewEmployees() {
    const { rows } = await db.findAllEmployees()
    console.table(rows)
    // db.findAllEmployees()
    // .then(({ rows }) => {
    //     const employees = rows;
    //     console.log('\n')
    //     console.table(employees);
    // })
    // .then(() => loadMainPrompts());
}

function viewEmployeesByDepartment() {
    db.findAllDepartments().then(({ rows }) => {
        const departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department would you like to see employees for?',
                choices: departmentChoices,
            },
        ])
            .then((res) => db.findAllEmployeesByDepartment(res.department))
            .then(({ rows }) => {
                const employees = rows;
                console.log('\n');
                console.table(employees);
            })
            .then(() => loadMainPrompts());
    });
}

function viewEmployeesByManager() {
    // db.findAllPossibleManagers(employeeId).then(({ rows }) => {
    //     const departments = rows;
    //     const departmentChoices = departments.map(({ id, name }) => ({
    //         name: name,
    //         value: id,
    //     }));

    //     inquirer.prompt([
    //         {
    //             type: 'list',
    //             name: 'departmentId',
    //             message: 'Which department would you like to see employees for?',
    //             choices: departmentChoices,
    //         },
    //     ])
    //         .then((res) => db.findAllEmployeesByDepartment(res.department))
    //         .then(({ rows }) => {
    //             const employees = rows;
    //             console.log('\n');
    //             console.table(employees);
    //         })
    //         .then(() => loadMainPrompts());
    // });

}

async function addEmployee() {

   const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the new employee?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the new employee's manager id?",
        }
    ])

const allEmployees = await db.createEmployee(answers)
    console.log(allEmployees)

}


function removeEmployee() {

}

async function updateEmployeeRole () {
    const { rows } = await db.findAllEmployees()
    // console.log(rows)
    const employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const newRole = employees.map(({ id, role_id }) => ({
        name: `${role_id}`,
        value: id,
    }));

    // console.log('employee choices', employeeChoices)
      const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'chosenEmployee',
            message: 'What employee would you like to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is this employee's new role id?",
            choices: newRole
        }
        
    ])
    
    // console.log(answers)
    // console.log('newrole', newRole)

    const updatedRole = await db.updateEmployeeRole(answers.chosenEmployee, answers.newRole)
    console.log(updatedRole)

}

async function updateEmployeeManager() {
    const { rows } = await db.findAllEmployees()
    const managers = rows;
    const employeeChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const newManager = managers.map(({ id, manager_id }) => ({
        name: `${manager_id}`,
        value: id,
    }));

    // console.log('employee choices', employeeChoices)
      const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'chosenEmployee',
            message: 'What employee would you like to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newManager',
            message: "What is this employee's new manager id?",
            choices: newManager
        }
        
    ])
    
    // console.log(answers)
    // console.log('newrole', newRole)

    const updatedManager = await db.updateEmployeeManager(answers.chosenEmployee, answers.newRole)
    console.log(updatedManager)

}

async function viewDepartments() {

    const { rows } = await db.findAllDepartments()
    console.table(rows)

}

async function addDepartment() {

   const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
        }
    ])

    
    const allDepartments = await db.createDepartment(answers)
        console.log(allDepartments)
    
}

function removeDepartment() {

}

function viewUtilizedBudgetByDepartment() {

}

async function viewRole() {
    console.log("Hello!")
    const { rows } = await db.findAllRoles()
    console.table(rows)
}

async function addRole() {

   const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the new role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id of the new role?',
        }
    ])

    
    const allRoles = await db.createRole(answers)
        console.log(allRoles)
    

}