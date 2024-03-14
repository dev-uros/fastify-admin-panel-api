import { Selectable } from 'kysely'
import { Users } from 'kysely-codegen'
import {UserStoreRequestSchemaType} from "../schemas/userStoreSchema";
import {UserUpdateRequestSchemaType} from "../schemas/userUpdateSchema";

export interface UserServiceInterface {
  getUserList(): Promise<Selectable<Users>[]>

  storeUser(userData: UserStoreRequestSchemaType): Promise<Selectable<Users>| undefined>

  updateUser(userData: UserUpdateRequestSchemaType, userId: number): Promise<Selectable<Users>| undefined>

}
