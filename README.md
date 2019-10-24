# Web Programming Fitness Tracker --- Fall 2019

## API User Guide
This project uses two main controllers(Users and Exercises) and each one serves several different purposes. This document outlines all of the functionality, provides instructions for using the API, and includes examples for each case.

### Users
This section describes all the functionality provided by the Users controller. It can return an array of all users, add & remove users, return a specific user's profile, and add new friends for users. 

#### View all users
To see a list of all users use:
http://localhost:3000/users

#### Add a new user
For adding a new user the only required parameter is a username. The user's age and favorite exercise can also be included but are not mandatory. For example, all of the following are valid:
http://localhost:3000/users/add?username=Elizabeth
http://localhost:3000/users/add?username=Elizabeth&age=23
http://localhost:3000/users/add?username=Elizabeth&age=23&favExercise=hiking

#### Delete a user
To delete a user only their username is required. 
http://localhost:3000/users/delete?user=Liz

#### View a user's information
To see a user profile only the username is required.
http://localhost:3000/users/me?user=Liz

#### Add a new friend to a user's friends list
For adding a new friend both user's usernames must be included.
http://localhost:3000/users/addfriend?user=Liz&friend=Kiesha


### Exercises
This section describes all the functionality implemented by the Exercises controller. It can display all exercises, display the exercises for a specific user, display all the exercises for a user's friends, add new exercises, and edit existing exercises.

#### View all exercises
To see all exercises for all users no parameters are required.
http://localhost:3000/exercises

#### Show a single user's exercises
This requires only the desired username.
http://localhost:3000/exercises/me?user=Liz

#### Show the exercises of a user's friends
Only the username is required here as well.
http://localhost:3000/exercises/friends?user=Liz

#### Adding a new exercise
To add a new exercise the only required parameter is the username. The controller computes the next ID and the current date to include in the exercise object. Values for type, description, location, and duration can be included to provide more detail about the exercise. All of the following are valid:
http://localhost:3000/exercises/add?user=Liz
http://localhost:3000/exercises/add?user=Liz&type=running
http://localhost:3000/exercises/add?user=Liz&type=running&description=3%20mile%20run&location=Woodstock&duration=30%20min

#### Editing an existing exercise
To edit an exercise the only required parameter is the exercise ID. However if only the ID is passed, nothing about the exercise will change. To change values, the replacements should be passed as parameters. For example the following input would change the type of exercise 5 to swimming and the location to Kingston.
http://localhost:3000/exercises/edit?id=5&type=swimming&location=Kingston