import { Static, Type } from '@sinclair/typebox'

export const inspirationBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type InspirationBootstrapResponseSchemaType = Static<
  typeof inspirationBootstrapResponseSchema
>
