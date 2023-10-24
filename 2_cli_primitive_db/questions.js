export const userQuestions = [
    {
        type: 'list',
        name: 'gender',
        message: 'Choose your gender:',
        choices: ['male', 'female'],
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter person`s age:',
        validate: function (input) {
            let exp = /^\d*$/;
            if (exp.test(input)) {
                    return true;
            } else {
                console.log("\nEnter a valid age");
            }
        }
    }
];

export const nameQuestion = {
    type: 'input',
    name: 'name',
    message: 'Enter user`s name to add user to the database. To cancel press ENTER: ',
};

export const searchConfQuestion = {
    type: 'confirm',
    name: 'searchConfirm',
    message: 'Would you like to search for a users in database?'
};

export const searchUserQuestion = {
    type: 'input',
    name: 'name',
    message: 'Enter user`s name, you want to find in DB: ',
    validate: function (input) {
        let exp = /^\w*$/;
        if (!exp.test(input) || input === "") {
            console.log("\nEnter a valid name.");
        } else {
            return true;
        }
    }
};