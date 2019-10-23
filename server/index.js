import express from 'express';
import path from 'path';

import userController from './controllers/Users.js';
import exerciseController from './controllers/Exercises.js';

const app = express();
const port = 3000;

app
    .use('/users', userController)

    .use('/exercises', exerciseController);

app.listen(port, () => console.log('Running on http://localhost:${port}'));

