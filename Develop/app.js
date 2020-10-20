const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { formatWithOptions } = require("util");


let employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
teamdata();
class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role
    }
    getRole() {
        return this.role;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getId(){
        return this.id;
    }
}
class Mgr extends Employee {
    constructor(name, id, email, role, office) {
        super(name, id, email, role);
        this.office = office;
    }
    getOfficeNumber(){
        return this.office;
    }
}
class Eng extends Employee {
    constructor(name, id, email, role, github) {
        super(name, id, email, role);
        this.github = github
    }
    getGithub(){
        return this.github;
    }
}
class Int extends Employee {
    constructor(name, id, email, role, school) {
        super(name, id, email, role);
        this.school = school
    }
    getSchool(){
        return this.school;
    }
}
function teamdata() {
    inquirer.prompt({
        // gather info, then construct the classes in the then statement
        type: "list",
        message: "Please select your role: ",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }
    ).then(data => {
        roleSelector(data);
    })
}

function roleSelector(data) {
    if (data.role == "Manager") {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter your name: ",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your work id: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email: ",
                name: "email"
            }, 
            {
                type: "input",
                message: "Enter your office number: ",
                name: "office"
            },
            {
                type: "list",
                message: "Do you want to enter another team member? ",
                choices: ["Yes", "No"],
                name: "addMember"
            }]
        ).then(data => {
            const manager = new Mgr(data.name, data.id, data.email, data.role, data.office)
            manager.role = "Manager";
            employees.push(manager);
            console.log(employees)
            if (data.addMember == "Yes") {
                teamdata();
            }
            else {
                writeFile();
                console.log("Success!")
            }
        })
    }
    else if (data.role == "Engineer") {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter your name: ",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your work id: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email: ",
                name: "email"
            }, 
            {
                type: "input",
                message: "Enter your GitHub URL: ",
                name: "github"
            },
            {
                type: "list",
                message: "Do you want to enter another team member? ",
                choices: ["Yes", "No"],
                name: "addMember"
            }]
        ).then(data => {
            const engineer = new Eng(data.name, data.id, data.email, data.role, data.github)
            engineer.role = "Engineer"
            employees.push(engineer);
            console.log(employees)
            if (data.addMember == "Yes") {
                teamdata();
            }
            else {
                writeFile();
                console.log("Success!")
            }
        })
    }
    else if (data.role == "Intern") {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter your name: ",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your work id: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email: ",
                name: "email"
            }, 
            {
                type: "input",
                message: "Enter your school: ",
                name: "school"
            },
            {
                type: "list",
                message: "Do you want to enter another team member? ",
                choices: ["Yes", "No"],
                name: "addMember"
            }]
        ).then(data => {
            const intern = new Int(data.name, data.id, data.email, data.role, data.school)
            intern.role = "Intern"
            employees.push(intern);
            console.log(employees)
            if (data.addMember == "Yes") {
                teamdata();
            }
            else {
                writeFile();
                console.log("Success!")
            }
        })
}}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const html = render(employees);
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function writeFile(){ fs.writeFile(outputPath, html, (err) => {
    if (err) throw (err);
})}
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
