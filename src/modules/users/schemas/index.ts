import { Static, Type } from '@sinclair/typebox'

export const userBootstrapResponseSchema = Type.Object(
  {
    message: Type.String({ errorMessage: 'nece', transform: ['trim'] })
  },
  {
    additionalProperties: false
  }
)

export type UserBootstrapResponseSchemaType = Static<
  typeof userBootstrapResponseSchema
>
