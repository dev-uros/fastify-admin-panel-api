import {Kysely, Selectable, Transaction} from "kysely";
import {DB, Users} from "kysely-codegen";

export default interface UserRepositoryInterface {

    getUserList(executor: Kysely<DB> | Transaction<DB>): Promise<Selectable<Users>[]>

    checkDoesUserEmailExist(executor: Kysely<DB> | Transaction<DB>, email: string): Promise<{id:number} | undefined>

    checkDoesUserProfilePictureExist(executor: Kysely<DB> | Transaction<DB>, profilePicture: string): Promise<{id:number} | undefined>

    storeUser(executor: Kysely<DB> | Transaction<DB>, user: {first_name: string, last_name: string, email: string, profile_picture_path:string}): Promise<Selectable<Users> | undefined>

}