process.on('uncaughtException', (err) => console.error('uncaughtException', err))

const workoutModel = require('../models/workout.model');
const mongoose = require('mongoose');
const { catchAsyncError } = require('../utils/catchAsyncError');
// get all workouts 
module.exports.getWorkouts = catchAsyncError(async(req, res) => {
    const user_id = req.user._id
    const workout = await workoutModel.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workout)

})

// get one workout
module.exports.getWorkout = catchAsyncError(async(req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No Such Workout' })
        }

        const workout = await workoutModel.findById(id)

        if (!workout) {
            return res.status(404).json({ error: 'No such Workout' });
        }

        res.status(200).json(workout)
    })
    // create  workout 
module.exports.createWorkout = catchAsyncError(async(req, res) => {
    console.log('adding workout')

    const { title, reps, load } = req.body;
    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'please fill all the fields', emptyFields })
    }
    try {
        const workout = await workoutModel.create({
            title,
            load,
            reps,
            user_id: req.user._id
        })
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

// update workout
module.exports.updateWorkout = catchAsyncError(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    const workout = await workoutModel.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    if (!workout) {
        return res.status(404).json({ error: 'No Such WorkOut' })
    }
    res.status(200).json(workout)

});
// delete workout

module.exports.deleteWorkout = catchAsyncError(async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }
    const workout = await workoutModel.findByIdAndDelete(id)

    if (!workout) {
        return res.status(404).json({ error: 'No Such WorkOut' })
    }

    res.status(200).json(workout)
})
process.on('uncaughtException', (err) => console.log(err))