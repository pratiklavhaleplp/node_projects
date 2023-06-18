const { parse } = require('csv-parse');
const express = require('express');



const fs = require('fs');
const { resolve } = require('path');

const dataArr = [];
const app = express();


app.use(express.static('public'));
app.use(express.json());

const parseData = (books) => {
    for (let book = 0; book < books.length; book++) {
        let key = Object.keys(books[book]);
        let value = Object.values(books[book]);
        let seprateKeys = key[0].split(";").map(ele => ele.replace(/"/g, ''));
        let seprateValues = value[0].split(";").map(ele => ele.replace(/"/g, ''));
        let finalObject = {};
        seprateKeys.map((ele, index) => {
            Object.assign(finalObject, { [ele.toString()]: seprateValues[index] });
        });
        Object.assign(finalObject, {
            available: true,
            borrower: '',
            dueDate: '',
            numberOfCopiesAvaliable: ''
        });
        dataArr[book] = finalObject;
    }
}
const writeDataInJsonFile = () => {
    const writeStream = fs.createWriteStream('books.json');
    writeStream.write(JSON.stringify(dataArr));
    console.log('File written into books.json');
}
const bookData = new Promise((resolve, reject) => {
    fs.createReadStream('books.csv').
        pipe(parse({
            comment: '#',
            columns: true,
            separator: ';',
            ignore_last_delimiters: true,
            quote: null,
            strict: false
        })).
        on('data', (data) => {
            dataArr.push(data);
        }).
        on('error', (err) => {
            reject(err);
        }).
        on('end', () => {
            parseData(dataArr);
            resolve();
        })
}
);

bookData.then(() => {
    writeDataInJsonFile();
    app.listen(3000, () => {
        console.log("server started at port number 3000 after loading the data and writing into new file");
    });
});


