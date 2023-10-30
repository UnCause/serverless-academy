import inquirer from "inquirer"
import {userQuestions, nameQuestion, searchConfQuestion, searchUserQuestion} from "./questions.js";
import { CreateUser, FindUser } from "./user.model.js";

//Asking a user wether he wants to search for users in database or to exit a program
function databaseSearchPrompt() {
    inquirer.prompt(searchConfQuestion).then((answers) => {
        if(answers.searchConfirm){
            userSearchPrompt();
        } else {
            process.exit(0);
        }
    });
}

//Prompt for searching for a user
function userSearchPrompt() {
    inquirer.prompt(searchUserQuestion).then((answers) => {
        FindUser(nameFormatter(answers.name));
    })
}

//Creating user in database
function createUserPrompt(username) {
    inquirer.prompt(userQuestions).then((answers) => {
        const user = {
            name: username,
            gender: answers.gender,
            age: parseInt(answers.age),
        };
        CreateUser(user);
        main();     //Implemented cycle with adding a user
    });
}

//Asking user`s name
function main() {
    inquirer.prompt(nameQuestion).then((answers) => {
        if(answers.name === ""){
            databaseSearchPrompt();
        } else {
            createUserPrompt(nameFormatter(answers.name));
        }
    });
}

// Returns name that entered user with first letter uppercase and the rest letters lowercase
function nameFormatter(name) {
    let validName = name.toLowerCase();
    let Upperl = validName[0].toUpperCase();
    validName = validName.replace(validName[0], Upperl);
    return validName
}

//Initializing
main();