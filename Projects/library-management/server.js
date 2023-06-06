const { parse } = require('csv-parse');
const express = require('express');

const fs = require('fs');
const { resolve } = require('path');

const dataArr = [];
const app = express();

const bookData = new Promise((resolve, reject) => {
    fs.createReadStream('kepler_data.csv').
    pipe(parse({
        comment: '#',
        columns: true
    })).
    on('data', (data) => {
        dataArr.push(data);
    }).
    on('error', (err) => {
        reject(err);
    }).
    on('end', () => {
        resolve();
    })
}
);

bookData.then(()=>{
    app.listen(3000, () => {
        console.log('Actual Data is: ', dataArr);
        console.log("server started at port number 3000 after loading the data");
    });
});


