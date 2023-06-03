const EventEmitter = require('events');

const racer = new EventEmitter();

racer.on('win', ()=>{
    console.log('thanks for winning the race');
});

racer.on('win', ()=>{
    console.log('take care');
});

racer.emit('win')