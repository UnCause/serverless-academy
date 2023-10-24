import inquirer from "inquirer"
import {userQuestions, nameQuestion, searchConfQuestion, searchUserQuestion} from "./questions.js";
import { CreateUser, FindUser } from "./user.model.js";

function databaseSearchPrompt() {
    inquirer.prompt(searchConfQuestion).then((answers) => {
        if(answers.searchConfirm){
            userSearchPrompt();
        } else {
            process.exit(0);
        }
    });
}

function userSearchPrompt() {
    inquirer.prompt(searchUserQuestion).then((answers) => {
        FindUser(nameFormatter(answers.name));
    })
}

function createUserPrompt(username) {
    inquirer.prompt(userQuestions).then((answers) => {
        const user = {
            name: username,
            gender: answers.gender,
            age: parseInt(answers.age),
        };
        CreateUser(user);
        main();
    });
}

function main() {
    inquirer.prompt(nameQuestion).then((answers) => {
        if(answers.name === ""){
            databaseSearchPrompt();
        } else {
            createUserPrompt(nameFormatter(answers.name));
        }
    });
}

function nameFormatter(name) {
    let validName = name.toLowerCase();
    let Upperl = validName[0].toUpperCase();
    validName = validName.replace(validName[0], Upperl);
    return validName
}

main();