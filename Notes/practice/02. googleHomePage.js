const { request } = require('https');

const req = request('https://www.google.com', (res)=>{
    res.on('data', (chunck)=>{
        console.log(`Chunck of the data is : ${chunck}`);
    });
    res.on('end',()=>{
        console.log("no more data is remaining");
    });
})

req.end();