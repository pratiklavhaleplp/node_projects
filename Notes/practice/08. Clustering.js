const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Beep beep beep! ${process.pid}`);
});

console.log('Running server.js...');

if(cluster.isMaster){
    console.log('number of cores you have on your system is: ',os.cpus().length);
    for(let i = 0; i< os.cpus().length; i++){
        cluster.fork();
    }
    console.log('master has been started');
}else{
    console.log('Worker has been started has been started');
    app.listen(3000);
}

