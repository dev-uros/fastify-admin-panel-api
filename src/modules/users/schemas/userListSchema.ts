import { Static, Type } from '@sinclair/typebox'
import {UserEntitySchema} from "./userEntitySchema";


export const userListResponseSchema = Type.Object(
  {
    message: Type.String(),
    data: Type.Array(UserEntitySchema)
  },
  {
    additionalProperties: false
  }
)

export type UserListResponseSchemaType = Static<
  typeof userListResponseSchema
>
