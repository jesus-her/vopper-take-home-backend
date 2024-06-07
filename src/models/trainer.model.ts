import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface TrainerInput {
  name?: string
  lastName?: string
  medals?: number
  phone?: string
}

export interface TrainerDocument extends TrainerInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const trainerSchema = new mongoose.Schema(
  {
    trainerId: {
      type: String,
      // required: false,
      unique: true,
      default: () => `trainer_${uuidv4()}`
    },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    medals: { type: Number, required: true },
    phone: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const TrainerModel = mongoose.model<TrainerDocument>('Trainer', trainerSchema)

export default TrainerModel
