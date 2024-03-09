import { Static, Type } from '@sinclair/typebox'

export const cvarakBootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type CvarakBootstrapResponseSchemaType = Static<
  typeof cvarakBootstrapResponseSchema
>
