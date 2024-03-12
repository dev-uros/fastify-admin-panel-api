import fp from 'fastify-plugin'
import { UserServiceInterface } from './userServiceInterface'
import { Insertable, Selectable } from 'kysely'
import { Users } from 'kysely-codegen'
import path from 'node:path'
import fs from 'node:fs/promises'
import { UserStoreRequestSchemaType } from '../schemas/userStoreSchema'
import transform from 'ajv-keywords/dist/keywords/transform'

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
          const __dirname = path.dirname(new URL(import.meta.url).pathname)
          const uploadDirectory =
            path.join(__dirname) + `/${userData.profile_picture_path}`
          await fs.writeFile(
            uploadDirectory,
            userData.profile_picture_path.file
          )

          userData.profile_picture_path = userData.profile_picture_path.filename
        })
        // return await fastify.UserRepository.storeUser(transform, userData)
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
