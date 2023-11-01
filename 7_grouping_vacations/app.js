import fs from "fs";

//Reading file
const dataString = fs.readFileSync("./data.json", "utf-8");
const data = JSON.parse(dataString);
let userIds = new Set();
let output = [];

//Creating a Set of unique userIds
data.forEach(vacation => {
    userIds.add(vacation.user._id)
});

//Creating an array of objects with employees data
for (const userId of userIds) {
        for (let i = 0; i < data.length; i++) {
            if(userId === data[i].user._id){
                output.push({
                    userId: data[i].user._id,
                    userName: data[i].user.name,
                    vacations: []
                })
                break;
            }
        }
}

//Assigning vacations data to certain employee
data.forEach(vacation => {
    output.forEach(employee => {
        if(vacation.user._id === employee.userId) {
            employee.vacations.push({
                startDate: vacation.startDate,
                endDate: vacation.endDate
            });
        }
    });
});

//Writing formatted data to the JSON file
fs.writeFileSync("./dataOutput.json", JSON.stringify(output, null, " "));
