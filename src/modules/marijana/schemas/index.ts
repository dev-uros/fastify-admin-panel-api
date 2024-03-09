import { Static, Type } from '@sinclair/typebox'

export const marijanaBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type MarijanaBootstrapResponseSchemaType = Static<
  typeof marijanaBootstrapResponseSchema
>
