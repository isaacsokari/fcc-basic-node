const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const { UserModel, ExerciseModel } = require('../models')

// add user or retrieve specific user data
router.post('/exercise/new-user', async (req, res) => {
  const { username } = req.body;

  try {
    let user = await UserModel.findOne({ username })

    if (!user) {
      user = await UserModel.create({username})
    }
    
    res.json(user)
  } catch (err) {
      res.status(400).json({error: err.message})
  }
})

// get all users
router.get('/exercise/users', async (req, res) => {
  try {
    let users = await UserModel.find({})

    if (!users) res.json([])

    res.json(users)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

// add exercises 
router.post('/exercise/add', async (req, res) => {
  try {
    const {userId, description, duration, date} = req.body;

    let properDate = date? new Date(date) : '';

    const user = await UserModel.findOne({_id: userId})

    if (!user) throw new Error('user not found')
    
    let exercise= await ExerciseModel.create(properDate? {userId, description, duration, date: properDate} : {userId, description, duration})

    if (exercise) {
      const {_id, username} = user
      const { description, duration, date} = exercise;

      let userWithExercise = {_id, username,description, duration, date: new Date(date).toString().substr(0, 15)};

      return res.json(userWithExercise)
    }

    return res.json({status: 'failed'})
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

// get user's exercises log
router.get('/exercise/log', async (req, res) => {
  try {
    const {userId, from, to, limit} = req.query;

    const user = await UserModel.findOne({_id: userId})
    if (!user) throw new Error('no user with that id found')
    // let properDate = date? new Date(date) : '';

    const aggregate = [{$match: {userId: mongoose.Types.ObjectId(userId)} } ];

    if (from){
      aggregate.push({$match: {date: {$gte: new Date(from)} } })
     };

    if (to) {
      aggregate.push({$match: {date: {$lte: new Date(to)} } })
    };

    if (limit) {
      aggregate.push({ $limit: +limit })
    };

    let exercises = await ExerciseModel.aggregate(aggregate).exec()

    if (exercises) {
      const {_id, username} = user

      let userWithExercises = {_id, username, log: exercises, count: exercises.length}

      return res.json(userWithExercises)
    }

    return res.json({status: 'failed'})
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})


module.exports = router;