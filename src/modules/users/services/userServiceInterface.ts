import { Selectable } from 'kysely'
import { Users } from 'kysely-codegen'
import {UserStoreRequestSchemaType} from "../schemas/userStoreSchema";

export interface UserServiceInterface {
  getUserList(): Promise<Selectable<Users>[]>

  storeUser(userData: UserStoreRequestSchemaType): Promise<Selectable<Users>| undefined>
}
