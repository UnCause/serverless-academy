import fs from "fs"

function GetJSON() {
    try {
        const data = fs.readFileSync("./database.txt", 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if(!fs.existsSync("./database.txt")){
            fs.writeFileSync("./database.txt", "", { flag: 'w' });
            console.log("Created database.");
        }
        return []
        
    }
}

export function CreateUser(data) {
    const users = GetJSON();
    users.push(data);
    fs.writeFileSync("./database.txt", JSON.stringify(users, null, " "));
    console.log(`Added user ${data.name}`);

}

export function FindUser(username) {
    const AllUsers = GetJSON();
    let users = [] 
    if (AllUsers.length) {
        AllUsers.forEach(user => {
            if(username === user.name) {
                users.push(user);
            }
        });
    } else {
        console.log("Database is empty.");
        process.exit(0);
    }
    if (users.length>0) {
        users.forEach(user => {
            console.log(`There is a ${user.name} who is a ${user.gender} and is ${user.age} years old.`);
        });
    } else {
        console.log("There is no users with such name.");
    }
}