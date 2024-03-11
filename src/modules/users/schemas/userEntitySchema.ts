import {TString, Type} from '@sinclair/typebox'
import {TDate} from "../../../types/customTypes";

export const UserEntitySchema = Type.Object({
  id: Type.Number(),
  created_at: Type.String({ format: 'date' }) as TString | TDate, // Use 'date-time' format instead of 'date'
  first_name: Type.String(),
  last_name: Type.Union([Type.String(), Type.Null()]),
  email: Type.String({ format: 'email' }), // Add format validation for email
  profile_picture_path: Type.String()
})

