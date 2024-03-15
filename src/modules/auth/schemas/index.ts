import { Static, Type } from '@sinclair/typebox'

export const authBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type AuthBootstrapResponseSchemaType = Static<
  typeof authBootstrapResponseSchema
>
