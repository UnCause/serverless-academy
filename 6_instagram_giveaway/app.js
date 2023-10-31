import fs from "fs"

//Reading the directory with all of the files
const filenames = fs.readdirSync("./data");

let data = [];
//creating a multidimensional array with 20 arrays according to the datafiles
for (let i = 0; i < filenames.length; i++) {
    let usernames = fs.readFileSync(`./data/${filenames[i]}`, 'utf-8');
    data.push(usernames.split("\n"));
};

//Returns amount of unique values from all of the files
function uniqueValues(data) {
    const dataflatSet = new Set (data.flat());
    return dataflatSet.size;
}

//Returns amount of values that appear in all 20 files
function existInAllFiles(data){
    const dataflatSet = new Set (data.flat());
    let dataSet = new Set();
    let existsInTen = new Set ();
    data.forEach(array => {
        let arraySet = new Set (array);
        dataSet.add(arraySet);
    });
    for (const word of dataflatSet) {
        let temp = 0;
        for (const array of dataSet) {
            if(array.has(word)){
                temp++;
            }
        }
        if( temp === 20){
            existsInTen.add(word);
        }
    }
    return existsInTen.size;
}

//Returns amount of values that appear in at least 10 files
function existInAtleastTen(data){
    const dataflatSet = new Set (data.flat());
    let dataSet = new Set();
    let existsInTen = new Set ();
    data.forEach(array => {
        let arraySet = new Set (array);
        dataSet.add(arraySet);
    });
    for (const word of dataflatSet) {
        let temp = 0;
        for (const array of dataSet) {
            if(array.has(word)){
                temp++;
            }
        }
        if( temp >= 10){
            existsInTen.add(word);
        }
    }
    return existsInTen.size;
}


console.log(`There is ${uniqueValues(data)} unique values`);
console.log(`There is ${existInAllFiles(data)} values that appear in all 20 files`);
console.log(`There is ${existInAtleastTen(data)} values that appear in at least 10 files`);
const tock = performance.now();
console.log(`Time spent: ${((tock)/1000).toFixed(2)} in seconds`);
