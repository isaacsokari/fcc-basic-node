require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to the DB')
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from the DB')
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
})

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String, required: true
  },
  userId: {
    type: mongoose.ObjectId, required: true
  },
  duration: {
    type: Number, required: true
  },
  date: {
    type: Date, default: Date.now
  }
})

const UserModel = mongoose.model('User', userSchema);
const ExerciseModel = mongoose.model('Exercise', exerciseSchema)

module.exports = {
  UserModel, ExerciseModel, 
}