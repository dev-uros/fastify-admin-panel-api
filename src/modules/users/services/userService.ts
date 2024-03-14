import fp from 'fastify-plugin'
import {UserServiceInterface} from './userServiceInterface'
import {Selectable} from 'kysely'
import {Users} from 'kysely-codegen'
import fs from 'node:fs/promises'
import {UserStoreRequestSchemaType} from '../schemas/userStoreSchema'
import {UserUpdateRequestSchemaType} from "../schemas/userUpdateSchema";

export default fp(
    async (fastify, opts) => {
        class UserService implements UserServiceInterface {
            async getUserList(): Promise<Selectable<Users>[]> {
                return await fastify.UserRepository.getUserList(fastify.db)
            }

            async storeUser(
                userData: UserStoreRequestSchemaType
            ): Promise<Selectable<Users> | undefined> {
                return await fastify.db.transaction().execute(async transaction => {
                    const uploadDirectory = fastify.userProfilePicturePath(
                        userData.profile_picture_path.filename
                    )
                    await fs.writeFile(
                        uploadDirectory.uploadPath,
                        userData.profile_picture_path.file
                    )

                    userData.profile_picture_path = uploadDirectory.publicPath
                    return await fastify.UserRepository.storeUser(transaction, userData)

                })
            }

            async updateUser(
                userData: UserUpdateRequestSchemaType,
                userId: number
            ): Promise<Selectable<Users> | undefined> {
                return await fastify.UserRepository.updateUser(fastify.db, userData, userId)
            }
        }

        await fastify.decorate('UserService', new UserService())
    },
    {
        name: 'UserService',
        dependencies: ['database', 'UserRepository']
    }
)

declare module 'fastify' {
    export interface FastifyInstance {
        UserService: UserServiceInterface
    }
}
