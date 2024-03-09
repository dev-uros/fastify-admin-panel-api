import { Static, Type } from '@sinclair/typebox'

export const commentBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type CommentBootstrapResponseSchemaType = Static<
  typeof commentBootstrapResponseSchema
>
