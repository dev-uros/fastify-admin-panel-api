import {Insertable, Kysely, Selectable, Transaction} from "kysely";
import {DB, Users} from "kysely-codegen";

export default interface UserRepositoryInterface {

    getUserList(executor: Kysely<DB> | Transaction<DB>): Promise<Selectable<Users>[]>

    checkDoesUserEmailExist(executor: Kysely<DB> | Transaction<DB>, email: string): Promise<{id:number} | undefined>

    checkDoesUserProfilePictureExist(executor: Kysely<DB> | Transaction<DB>, profilePicture: string): Promise<{id:number} | undefined>

    storeUser(executor: Kysely<DB> | Transaction<DB>, user: Insertable<Users>): Promise<Selectable<Users> | undefined>

}