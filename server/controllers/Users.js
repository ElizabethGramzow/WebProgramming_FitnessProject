const express = require('express');
const users = require('../models/Users');

const app = express.Router();

app.get('/', (req, res) => res.send(users));

app.post('/add', (req, res) => {
    users.push(req.query);
    res.send(users[users.length-1]);
})

app.post('/profile', (req, res) => {
    const username = req.query.user;
    const myExercises = [];
    
    let i = 0;
    let userProfile;
    for (i = 0; i < users.length; i++){
        if (users[i].username == username){
            res.send(users[i]);
            return;
        }
    }

    res.send('User not found');
})

module.exports = app;