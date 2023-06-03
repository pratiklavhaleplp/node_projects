const { parse } = require('csv-parse');
const fs = require('fs');

const result = [];
fs.createReadStream('kepler_data.csv').
    pipe(parse({
        comment: '#',
        columns: true
    })).
    on('data', (data) => {
        result.push(data);
        console.log(data);
    }).
    on('error', (err) => {
        console.log("error is : ", err);
    }).
    on('end', () => {
        console.log("end reading the data");
    })