import { Insertable, Selectable } from 'kysely'
import { Users } from 'kysely-codegen'

export interface UserServiceInterface {
  getUserList(): Promise<Selectable<Users>[]>
}
