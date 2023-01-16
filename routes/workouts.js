const express = require('express');
const Workout = require('../models/workout.model');
const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workout.controllers');
const router = express.Router();
const auth = require('../middleware/auth');
//all
router.use(auth);
router.get('/', getWorkouts)

// single 
router.get('/:id', getWorkout)

// add 
router.post('/', createWorkout)

// delete
router.delete("/:id", deleteWorkout)

// update
router.patch('/:id', updateWorkout)


module.exports = router;