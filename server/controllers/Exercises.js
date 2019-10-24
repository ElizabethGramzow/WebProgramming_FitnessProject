const express = require('express');
const exercises = require('../models/Exercises');
const users = require('../models/Users');

const app = express.Router();

//returns all exercises
app.get('/', (req, res) => res.send(exercises));

//returns all the user's exercises
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

//returns all the exercises from the user's friends
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

//adds a new exercise
//only the username is required
//if no other parameters are included the exercise will be mostly empty
app.post('/add', (req, res) => {
    //calculate the id the new exercise should be assigned
    const nextID = (+exercises[exercises.length-1].id + 1).toString();

    //compute todays date to assign to the exercise
    var dateObject = new Date();
    var fullDate = (dateObject.getMonth() + 1).toString() + '/' + (dateObject.getDate()).toString() + '/' + (dateObject.getFullYear()).toString();
    
    const newExercise = {
        id: nextID, 
        user: req.query.user, 
        type: '', 
        description: '', 
        location: '', 
        duration: '', 
        date: fullDate
    };

    //any included parameters are assigned to newExercise here
    if (req.query.type !== undefined){
        newExercise.type = req.query.type;
    }
    if (req.query.description !== undefined){
        newExercise.description = req.query.description;
    }
    if (req.query.location !== undefined){
        newExercise.location = req.query.location;
    }
    if (req.query.duration !== undefined){
        newExercise.duration = req.query.duration;
    }

    exercises.push(newExercise);
    res.send(newExercise);
});

//pre-existing exercises can be edited
//the exercise id is the only required parameter
//other parameters are used to replace the old data
//if a parameter is not included it will not be changed
app.post('/edit', (req,res) => {
    const editID = req.query.id;
    var editExercise = {};

    let i = 0;
    let found = false;
    for (i = 0; i < exercises.length; i++){
        if (exercises[i].id == editID){
            editExercise = exercises[i];
            found = true;
            break;
        }
    }

    if (!found){
        res.send('Exercise not found');
        return;
    }

    if (req.query.user !== undefined){
        editExercise.user = req.query.user;
    }
    if (req.query.type !== undefined){
        editExercise.type = req.query.type;
    }
    if (req.query.description !== undefined){
        editExercise.description = req.query.description;
    }
    if (req.query.location !== undefined){
        editExercise.location = req.query.location;
    }
    if (req.query.duration !== undefined){
        editExercise.duration = req.query.duration;
    }
    if (req.query.date !== undefined){
        editExercise.date = req.query.date;
    }

    exercises[i] = editExercise;
    res.send(editExercise);
});

module.exports = app;