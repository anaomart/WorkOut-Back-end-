const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const globalMiddleWareError = require('./utils/globalMiddleWareError');
const cors = require('cors');
// environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3900;

// middleware
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next();
});

// Global Error Handler
app.use(globalMiddleWareError);

// main Routes 
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
// routes  
app.get("/", (req, res, next) => {
    res.json({ msg: "welcome TO the app " })
});
app.all("*", (req, res, next) => {
    next(res.status(404).json("Can't find this route"));
});
// connect to database 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('connecting')
}).catch(err => console.log({ err }));

// listen to requests
app.listen(PORT, console.log(`listening on port ${PORT}`));