import { Type } from '@sinclair/typebox'

export const badRequestSchema = Type.Object(
  {
    errors: Type.Array(Type.String())
  },
  { description: 'Bad request response' }
)

export const failedValidationSchema = Type.Object(
  {
    messsage: Type.String()
  },
  { description: 'Failed validation response' }
)

export const serverErrorSchema = Type.Object(
  {
    message: Type.Literal('Server Error')
  },
  { description: 'Server error response' }
)
