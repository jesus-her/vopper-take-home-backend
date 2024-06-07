import mongoose from 'mongoose'

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  medals: { type: Number, required: true }
})
