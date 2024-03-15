import { Static, Type } from '@sinclair/typebox'

export const inpspirationBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type InpspirationBootstrapResponseSchemaType = Static<
  typeof inpspirationBootstrapResponseSchema
>
