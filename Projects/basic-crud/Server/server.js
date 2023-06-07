const express = require('express');

const { connection, findDocument, findDocumentsPaginated, insertOneDocument, updateOneDocument, deleteOneDocument } = require('../Db/db');
const app = express();

app.use(express.json());

app.get('/getUser', (req, res) => {
    findDocument('userDB', 'users').
        then(data => {
            res.json(data);
            connection.close();
        });
});

app.get('/getTenMovies', (req, res) => {
    findDocumentsPaginated('movieData', 'movies').
        then(data => {
            res.json(data);
            connection.close();
        })
});

app.get('/getUsers', (req, res) => {
    findDocumentsPaginated('userDB', 'users').
        then(data => {
            res.json(data);
            connection.close();
        })
});

app.post('/addUser', (req, res) => {
    let user = req.body;
    insertOneDocument('userDB', 'users', user).
        then(data => {
            res.json(data);
            connection.close();
        })
});

app.put('/updateUser', (req, res) => {
    let user = req.body;
    console.log(user);
    let query = {
        name: user.name
    };
    updateOneDocument('userDB', 'users', filter, query).
        then(data => res.send(data));
});

app.delete('/deleteUser', (req, res) => {
    let user = req.body;
    console.log(user);
    let query = {
        name: user.name
    };
    deleteOneDocument('userDB', 'users', query).
        then(data => res.send(data));
});

app.listen(3000, () => {
    console.log('app started on port number : 3000');
})