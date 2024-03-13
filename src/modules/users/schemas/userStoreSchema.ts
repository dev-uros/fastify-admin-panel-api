import { Static, Type } from '@sinclair/typebox'
import {UserEntitySchema} from "./userEntitySchema";
import {TString} from "@sinclair/typebox/build/import";
import {TDate} from "../../../types/customTypes";

export const userStoreRequestSchema = Type.Object(
  {
    first_name: Type.String({
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: 'User name should have at least one character!',
        maxLength: 'User name can have up to 255 characters!'
      },
      transform: ['trim', 'toUpperCase']
    }),
    last_name: Type.String({
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: 'User last name should have at least one character!',
        maxLength: 'User last name can have up to 255 characters!'
      },
      transform: ['trim', 'toUpperCase']
    }),
    email: Type.String({
      minLength: 1,
      maxLength: 255,
      format: 'email',
      errorMessage: {
        minLength: 'User email should have at least one character!',
        maxLength: 'User email can have up to 255 characters!',
        format: 'Invalid user email format'
      }
    }),
    profile_picture_path: Type.Any({
      contentMediaType: 'image/png',
      contentEncoding: 'binary',
      isFile: true
    })
  },
  {
    errorMessage: {
      type: 'Invalid JSON',
      required: {
        first_name: 'User first name is required',
        last_name: 'User last name is required',
        email: 'User email is required',
        profile_picture_path: 'Profile picture is required'
      }
    },
    additionalProperties: false
  }
)

export type UserStoreRequestSchemaType = Static<typeof userStoreRequestSchema>

export const userStoreResponseSchema = Type.Object(
    {
      message: Type.String(),
      data: Type.Object({
          id: Type.Number(),
          created_at: Type.String({ format: 'date' }) as TString | TDate, // Use 'date-time' format instead of 'date'
          first_name: Type.String(),
          last_name: Type.Union([Type.String(), Type.Null()]),
          email: Type.String({ format: 'email' }), // Add format validation for email
          profile_picture_path: Type.String()
      })
    },
    {
      additionalProperties: false
    }
)
export type UserStoreResponseSchemaType = Static<typeof userStoreResponseSchema>
