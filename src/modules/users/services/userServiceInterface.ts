import { Insertable, Selectable } from 'kysely'
import { Users } from 'kysely-codegen'

export interface UserServiceInterface {
  getUserList(): Promise<Selectable<Users>[]>

  storeUser(userData: Insertable<Users>): Promise<Selectable<Users>| undefined>
}
