import { Static, Type } from '@sinclair/typebox'

export const userBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type UserBootstrapResponseSchemaType = Static<
  typeof userBootstrapResponseSchema
>
