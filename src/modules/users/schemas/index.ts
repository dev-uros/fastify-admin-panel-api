import { Static, TString, Type } from '@sinclair/typebox'
import { TDate } from 'types/customTypes'


const UserSchema = Type.Object({
  id: Type.Number(),
  created_at: Type.String({ format: 'date' }) as TString | TDate, // Use 'date-time' format instead of 'date'
  first_name: Type.String(),
  last_name: Type.Union([Type.String(), Type.Null()]),
  email: Type.String({ format: 'email' }), // Add format validation for email
  profile_picture_path: Type.String()
})
export const userBootstrapResponseSchema = Type.Object(
  {
    message: Type.String(),
    data: Type.Array(UserSchema)
  },
  {
    additionalProperties: false
  }
)

export type UserBootstrapResponseSchemaType = Static<
  typeof userBootstrapResponseSchema
>
