import { Request, Response } from 'express'
import { formatDuplicateKeyError } from '../utils/errorFormatter'
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

  try {
    const trainer = await createTrainer({ ...body })
    return res.send(trainer)
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(400).send([formatDuplicateKeyError(e)])
    }
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

export async function updateTrainerHandler (
  req: Request<UpdateTrainerInput['params']>,
  res: Response
) {
  const trainerId = req.params.trainerId
  const update = req.body

  try {
    const trainer = await findTrainer({ trainerId })

    if (!trainer) {
      return res.sendStatus(404)
    }

    const updatedTrainer = await findAndUpdateTrainer({ trainerId }, update, {
      new: true
    })

    return res.send(updatedTrainer)
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(400).send([formatDuplicateKeyError(e)])
    }
    return res.status(500).send({ message: 'Internal Server Error' })
  }
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
