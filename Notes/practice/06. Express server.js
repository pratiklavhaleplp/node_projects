const express = require('express');

const app = express();

const users = [
    {
        name: 'pratik',
        age : 27,
        id: 1
    },
    {
        name: 'rutvik',
        age : 24,
        id: 2
    },
    {
        name: 'ankita',
        age : 30,
        id: 3
    }
]

app.use(express.json());

app.post('/users/add',(req, res) =>{
    const data = req.body;
    users.push(data);
    console.log('users data is : ', users);
    res.send('data pushed to the users');
})
app.get('/users',(req, res)=>{
    res.json(users);
})

app.get('/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const user = users.filter(user => user.id === id);
    res.json(user);
})

app.listen(3000, ()=>{
    console.log("App started listning on port number 3000")
})