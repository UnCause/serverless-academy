import axios from "axios";
import { endpoints } from "./endpoints.js";

let countert = 0;
let counterf = 0;

async function EndpointCheck (endpoint) {
    let isDone
    let success = false;
    for (let i = 0; i < 3; i++) {
        try {
            const res = await axios.get(endpoint);
            if (res.status === 200) {
                isDone = getIsDone(res.data)
                countert += isDone;
                counterf += !isDone;
                success = true;
            }
        } catch (error) {}
        if (success) {break}
    }
    if (isDone === undefined) {
        console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
    } else {
        console.log(`[Success] ${endpoint}: isDone - ${isDone}`);
    }

}

function getIsDone (obj) {
    const arr = [obj];
    while (arr?.length > 0 ) {
        let temp = arr.pop();
        if( temp.hasOwnProperty("isDone")){
            return temp.isDone;
        } else {
            Object.keys(temp).forEach(k => {
                if (typeof temp[k] === 'object' && temp[k] !== null) {
                  arr.push(temp[k]);
                }
              });
        }

    }
}

async function getData() {
    for (const endpoint of endpoints) {
        await EndpointCheck(endpoint)   
    }
    console.log(`
Found True values: ${countert},
Found False values: ${counterf}
    `)
}
getData();

