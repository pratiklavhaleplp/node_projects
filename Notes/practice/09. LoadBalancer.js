// load balancer will come into picture when you have multiple servers running. 
// in parallel.
// Clustering is adding more node processes not a all-together machine.
// Horizontal scaling is the way you can add a machine. 
// vertical scaling is the way you add multiple node process with the help of clustering.
// pm-2 is used for managing clusters
// pm- start server.js -i max|1|2|3 any numer you can give a number represents number of workers
// max makes the use of all process we have indside the MACHINE.
// pm2 delete 09. LoadBalancer.js
// pm2 show 0|1|2|3... any one process id's this will help to get the details of one process.
// pm2 stop 4 4th cluster will get stoped.
// pm2 start 4 4th cluster will get started once again.
// pm2 reload filename.js this is like a zero down time servers.

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

