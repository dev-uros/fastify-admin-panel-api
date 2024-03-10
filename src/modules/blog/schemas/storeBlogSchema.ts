import { Static, Type } from '@sinclair/typebox'

export const storeBlogSchema = Type.Object(
{
  message: Type.String()
},
{
  additionalProperties: false
}
)

export type StoreBlogSchemaType = Static<
typeof storeBlogSchema
>
