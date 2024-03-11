import { Static, Type } from '@sinclair/typebox'

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
      contentEncoding: 'binary'
      //   isFile: true
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

// export const userStoreRequestSchema = {
//     type: 'object',
//     properties: {
//         first_name: {
//             type: 'string',
//             minLength: 1,
//             maxLength: 255,
//             errorMessage: {
//                 minLength: 'User name should have at least one character!',
//                 maxLength: 'User name can have up to 255 characters!'
//             },
//             transform: ['trim', 'toUpperCase']
//         },
//         last_name: {
//             type: 'string',
//             minLength: 1,
//             maxLength: 255,
//             errorMessage: {
//                 minLength: 'User last name should have at least one character!',
//                 maxLength: 'User last name can have up to 255 characters!'
//             },
//             transform: ['trim', 'toUpperCase']
//         },
//         email: {
//             type: 'string',
//             minLength: 1,
//             maxLength: 255,
//             format: 'email',
//             errorMessage: {
//                 minLength: 'User email should have at least one character!',
//                 maxLength: 'User email can have up to 255 characters!',
//                 format: 'Invalid user email format'
//             }
//         },
//         profile_picture_path: {
//             type: "string",
//             isFile: true,
//             contentMediaType: 'image/png',
//             contentEncoding: 'binary'
//         }
//     },
//     required: ['first_name', 'last_name', 'email', 'profile_picture_path'],
//     errorMessage: {
//         type: 'Invalid JSON',
//         properties: {
//             first_name: 'User first name is required',
//             last_name: 'User last name is required',
//             email: 'User email is required',
//             profile_picture_path: 'Profile picture is required'
//         }
//     },
//     additionalProperties: false
// };
export type UserStoreRequestSchemaType = Static<typeof userStoreRequestSchema>
