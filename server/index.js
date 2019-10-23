const express = require('express');
const path = require('path');

const userController = require('./controllers/Users');
const exerciseController = require('./controllers/Exercises');

const app = express();
const port = 3000;

app
    .use('/users', userController);

    //.use('/exercises', exerciseController);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

