import { Express, Request, Response } from 'express'
import {
  getPokemonsHandler,
  generatePDFHandler
} from './controller/pokemon.controller'
import {
  createTrainerHandler,
  getTrainerHandler,
  updateTrainerHandler,
  deleteTrainerHandler,
  getAllTrainersHandler
} from './controller/trainer.controller'

import {
  createTrainerSchema,
  deleteTrainerSchema,
  getTrainerSchema,
  updateTrainerSchema
} from './schema/trainer.schema'
import validateResource from './middleware/validateResource'

function routes (app: Express) {
  app.get('/api/pokemons', getPokemonsHandler)
  app.get('/api/pokemons/:name/pdf', generatePDFHandler)

  app.post(
    '/api/trainers',
    [validateResource(createTrainerSchema)],
    createTrainerHandler
  )
  app.put(
    '/api/trainers/:trainerId',
    [validateResource(updateTrainerSchema)],
    updateTrainerHandler
  )

  app.get('/api/trainers', getAllTrainersHandler)

  app.get(
    '/api/trainers/:trainerId',
    validateResource(getTrainerSchema),
    getTrainerHandler
  )

  app.delete(
    '/api/trainers/:trainerId',
    [validateResource(deleteTrainerSchema)],
    deleteTrainerHandler
  )
}

export default routes
