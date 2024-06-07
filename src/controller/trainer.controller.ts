import { Request, Response } from 'express'
import {
  CreateTrainerInput,
  UpdateTrainerInput
} from '../schema/trainer.schema'
import {
  createTrainer,
  deleteTrainer,
  findAllTrainers,
  findAndUpdateTrainer,
  findTrainer
} from '../service/trainer.service'

export async function createTrainerHandler (
  req: Request<{}, {}, CreateTrainerInput['body']>,
  res: Response
) {
  const body = req.body

  const trainer = await createTrainer({ ...body })

  return res.send(trainer)
}

export async function updateTrainerHandler (
  req: Request<UpdateTrainerInput['params']>,
  res: Response
) {
  const trainerId = req.params.trainerId
  const update = req.body

  const trainer = await findTrainer({ trainerId })

  if (!trainer) {
    return res.sendStatus(404)
  }

  const updatedTrainer = await findAndUpdateTrainer({ trainerId }, update, {
    new: true
  })

  return res.send(updatedTrainer)
}

export async function getAllTrainersHandler (req: Request, res: Response) {
  const trainers = await findAllTrainers()

  if (!trainers) {
    return res.sendStatus(404)
  }

  return res.send(trainers)
}

export async function getTrainerHandler (
  req: Request<UpdateTrainerInput['params']>,
  res: Response
) {
  const trainerId = req.params.trainerId

  const trainer = await findTrainer({ trainerId })

  if (!trainer) {
    return res.sendStatus(404)
  }

  return res.send(trainer)
}

export async function deleteTrainerHandler (
  req: Request<UpdateTrainerInput['params']>,
  res: Response
) {
  const trainerId = req.params.trainerId

  const trainer = await findTrainer({ trainerId })

  if (!trainer) {
    return res.sendStatus(404)
  }

  await deleteTrainer({ trainerId })

  return res.sendStatus(200)
}
