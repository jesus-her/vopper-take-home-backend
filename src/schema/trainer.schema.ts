import { object, number, string, TypeOf } from 'zod'

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required'
    }).min(1, 'Name should be at least 1 character long'),

    lastName: string({
      required_error: 'Last name is required'
    }).min(5, 'Last name should be at least 5 characters long'),

    medals: number({
      required_error: 'Medals is required'
    }).nonnegative('Medals should be a non-negative number'),

    phone: string({
      required_error: 'Phone is required'
    }).regex(/^\d{10}$/, 'Phone should be a 10-digit number')
  }).strict()
}

const params = {
  params: object({
    trainerId: string({
      required_error: 'trainerId is required'
    })
  })
}

export const createTrainerSchema = object({
  ...payload
})

export const updateTrainerSchema = object({
  ...payload,
  ...params
})

export const deleteTrainerSchema = object({
  ...params
})

export const getTrainerSchema = object({
  ...params
})

export type CreateTrainerInput = TypeOf<typeof createTrainerSchema>
export type UpdateTrainerInput = TypeOf<typeof updateTrainerSchema>
export type ReadTrainerInput = TypeOf<typeof getTrainerSchema>
export type DeleteTrainerInput = TypeOf<typeof deleteTrainerSchema>
