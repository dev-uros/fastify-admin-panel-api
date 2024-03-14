import {Insertable, Kysely, Selectable, Transaction} from "kysely";
import {DB, Users} from "kysely-codegen";
import {Updateable} from "kysely/dist/esm";

export default interface UserRepositoryInterface {

    getUserList(executor: Kysely<DB> | Transaction<DB>): Promise<Selectable<Users>[]>

    checkDoesUserEmailExist(executor: Kysely<DB> | Transaction<DB>, email: string): Promise<{id:number} | undefined>

    checkDoesUserEmailExistIgnoringUser(executor: Kysely<DB> | Transaction<DB>, email: string, userId: number): Promise<{id:number} | undefined>

    checkDoesUserProfilePictureExist(executor: Kysely<DB> | Transaction<DB>, profilePicture: string): Promise<{id:number} | undefined>

    storeUser(executor: Kysely<DB> | Transaction<DB>, user: Insertable<Users>): Promise<Selectable<Users> | undefined>

    updateUser(executor: Kysely<DB> | Transaction<DB>, user: Updateable<Users>, userId: number): Promise<Selectable<Users> | undefined>

}