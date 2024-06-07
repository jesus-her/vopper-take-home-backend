import { object, number, string, TypeOf } from 'zod'

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    lastName: string({
      required_error: 'Last name is required'
    }).min(5, 'Last name should be at least 5 characters long'),
    medals: number({
      required_error: 'Medals is required'
    }),
    phone: string({
      required_error: 'Phone is required'
    })
  })
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
