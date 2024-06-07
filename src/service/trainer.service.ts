import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import TrainerModel, {
  TrainerDocument,
  TrainerInput
} from '../models/trainer.model'

export async function createTrainer (input: TrainerInput) {
  try {
    const result = await TrainerModel.create(input)

    return result
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function findAllTrainers () {
  try {
    const trainers = await TrainerModel.find({})

    return trainers
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function findTrainer (
  query: FilterQuery<TrainerDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await TrainerModel.findOne(query, {}, options)

    return result
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function findAndUpdateTrainer (
  query: FilterQuery<TrainerDocument>,
  update: UpdateQuery<TrainerDocument>,
  options: QueryOptions
) {
  return TrainerModel.findOneAndUpdate(query, update, options)
}

export async function deleteTrainer (query: FilterQuery<TrainerDocument>) {
  return TrainerModel.deleteOne(query)
}
