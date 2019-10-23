const express = require('express');
const exercises = require('../models/Exercises');
const users = require('../models/Users');

const app = express.Router();

app.get('/', (req, res) => res.send(exercises[1]));

app.post('/me', (req, res) => {
    const username = req.query.user;
    const myExercises = [];

    let i = 0;
    for (i = 0; i < exercises.length; i++){
        if (exercises[i].user == username){
            myExercises.push(exercises[i]);
        }
    };
    
    res.send(myExercises);
});

app.post('/friends', (req, res) =>{
    const username = req.query.user;
    const frExercises = [];

    let i = 0;
    let found = false;
    let friends = [];
    while(!found){
        if (users[i].username == username){
            friends = users[i].friends;
            found = true;
        }
        i++;
    }

    for (i = 0; i < exercises.length; i++){
        if (friends.includes(exercises[i].user)){
            frExercises.push(exercises[i]);
        }
    }

    res.send(frExercises);
});

module.exports = app;