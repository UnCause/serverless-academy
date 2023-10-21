const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

function start() {
    readline.question(`Enter a few words or numbers separated by a space: `, data => {
        sorting(data);
    });
}

start();

function sorting(data) {
    readline.question(`How would you like to sort values:
1. Sort words alphabetically
2. Show numbers from lesser to greater
3. Show numbers from bigger to smaller
4. Display words in ascending order by number of letters in the word
5. Show only unique words
6. Display only unique values from the set of words and numbers
Select (1-6) and press ENTER(type exit to close program): `, action => {
        let data_arr = data.split(" ");
        let numbers_arr = [];
        let string_arr = [];
        let int_exp = /^\d*$/;
        let float_exp = /^\d*\.\d*$/;
        data_arr.map(element => {
            if(int_exp.test(element)){
                numbers_arr.push(parseInt(element));
            } else if (float_exp.test(element)){
                numbers_arr.push(parseFloat(element));
            } else {
                string_arr.push(element);
            };
        });
        switch (action) {
            case `1`:
                console.log(sorting1(string_arr));
                break;
            case `2`:
                console.log(sorting2(numbers_arr));
                break;
            case `3`:
                console.log(sorting3(numbers_arr));
                break;
            case `4`:
                console.log(sorting4(string_arr));
                break;
            case `5`:
                console.log(sorting5(string_arr));
                break;
            case `6`:
                console.log(sorting5(data_arr));
                break;
            case `exit`:
                console.log(`Closing program...`);
                return readline.close();
            default:
                sorting(data);
                break;
        }
        start();
    });
}

function sorting1(string_arr) {
    return string_arr.sort();
}
function sorting2(numbers_arr) {
    return numbers_arr.sort((a,b) => a - b);
}
function sorting3(numbers_arr) {
    return numbers_arr.sort((a,b) => b - a);
}
function sorting4(string_arr) {
    let data = string_arr.map(element => {
        return [element, element.length]
    });
    data.sort((a,b) => a[1] - b[1]);
    return data.map(element => {return element[0]});
}
function sorting5(string_arr) {
    let data = []
    string_arr.forEach(element => {
        if(!data.includes(element)){
            data.push(element);
        };
    });
    return data;
}
