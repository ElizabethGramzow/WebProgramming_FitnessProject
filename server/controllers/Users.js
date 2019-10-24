const express = require('express');
const users = require('../models/Users');

const app = express.Router();

//returns list of all users
app.get('/', (req, res) => res.send(users));

//adds a user --- username is the only required field
//age and favExercise can be included
app.post('/add', (req, res) => {
    if (req.query.username){
        const newUser = {
            username: req.query.username, 
            age: '', 
            friends: [], 
            favExercise: ''
        };

        if (req.query.age !== undefined){
            newUser.age = req.query.age;
        }
        if (req.query.favExercise !== undefined){
            newUser.favExercise = req.query.favExercise;
        }

        users.push(newUser);
        res.send(users[users.length-1]);
    } else {
        res.send('Parameter not found: username must be included');
    }
});

//delete a user
app.post('/delete', (req, res) => {
    const username = req.query.user;
    const userIndex = userLookup(username).index;
    if (userIndex >= 0){
        users.splice(userIndex, 1);
        res.send(`${username} deleted`);
    } else {
        res.send('User not found');
    }
    
});

//return user's information
//can be used for displaying user profile
app.post('/me', (req, res) => {
    const username = req.query.user;
    res.send(userLookup(username).user);
});

//adds a new friend to the user
app.post('/addfriend', (req, res) => {
    const username = req.query.user;
    const friendname = req.query.friend;

    const userInfo = userLookup(username);
    const friendInfo = userLookup(friendname);
    
    if (userInfo.index < 0 || friendInfo.index < 0){
        res.send('User or friend not found');
    } else {
        userInfo.user.friends.push(friendname);
        res.send('Friend added!');
    }
});

//used for finding users
//returns the user object and its position in the array
function userLookup(targetUser){
    let i = 0;
    for (i = 0; i < users.length; i++){
        if (users[i].username == targetUser){
            return {user: users[i], index: i};
        }
    }
    return {user: 'User not found', index: -1};
}

module.exports = app;