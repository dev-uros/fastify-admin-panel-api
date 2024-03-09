import { Static, Type } from '@sinclair/typebox'

export const blogBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type BlogBootstrapResponseSchemaType = Static<
  typeof blogBootstrapResponseSchema
>
