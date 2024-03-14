import { Static, Type } from '@sinclair/typebox'
import { UserEntitySchema } from './userEntitySchema'

export const userShowResponseSchema = Type.Object(
  {
    message: Type.String(),
    data: UserEntitySchema
  },
  {
    additionalProperties: false
  }
)
export const userShowParamSchema = Type.Object(
  {
    id: Type.Number({ errorMessage: 'User ID parameter is required' })
  },
  {
    errorMessage: {
      type: 'Invalid JSON',
      required: {
        id: 'User ID parameter is required'
      }
    },
    additionalProperties: false
  }
)
export type UserShowResponseSchemaType = Static<typeof userShowResponseSchema>
