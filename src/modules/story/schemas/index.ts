import { Static, Type } from '@sinclair/typebox'

export const storyBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type StoryBootstrapResponseSchemaType = Static<
  typeof storyBootstrapResponseSchema
>
