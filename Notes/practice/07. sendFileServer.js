const express = require('express');

const path = require('path');

const app = express();

app.get('/image', (req, res)=>{
    console.log('path is : ', path.join(__dirname, '../','ScreenShots','/5 Second Video_ Watch the Milky Way Rise.mp4'));
    // G:\Node-React-Mongo\Notes\node_projects\Notes\5 Second Video_ Watch the Milky Way Rise.mp4
    res.sendFile(path.join(__dirname, '../ScreenShots','/0007.gif'));
});

app.listen(3000, ()=>{
    console.log("image server started on port number 3000");
});