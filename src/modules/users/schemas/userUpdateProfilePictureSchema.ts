import { Static, Type } from '@sinclair/typebox'
import { UserEntitySchema } from './userEntitySchema'

export const userUpdateProfilePictureRequestSchema = Type.Object(
    {
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
          profile_picture_path: 'Profile picture is required'
        }
      },
      additionalProperties: false
    }
)

export const userUpdateProfilePictureParamSchema = Type.Object({
      id: Type.Number({errorMessage: 'User ID parameter is required'})
    },
    {
      errorMessage: {
        type: 'Invalid JSON',
        required: {
          id: 'User ID parameter is required',
        }
      },
      additionalProperties: false
    })

export type UserUpdateProfilePictureRequestSchemaType = Static<typeof userUpdateProfilePictureRequestSchema>

export const userUpdateProfilePictureResponseSchema = Type.Object(
    {
      message: Type.String(),
      data: UserEntitySchema
    },
    {
      description: 'Success response',
      additionalProperties: false
    }
)
export type UserUpdateProfilePictureResponseSchemaType = Static<typeof userUpdateProfilePictureResponseSchema>
