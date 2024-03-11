import fp from 'fastify-plugin'
import { UserServiceInterface } from './userServiceInterface'
import {Insertable, Selectable} from 'kysely'
import { Users } from 'kysely-codegen'

export default fp(
  async (fastify, opts) => {
    class UserService implements UserServiceInterface {
      async getUserList(): Promise<Selectable<Users>[]> {
        return await fastify.UserRepository.getUserList(fastify.db)
      }

      async storeUser(userData: Insertable<Users>): Promise<Selectable<Users> | undefined>{
          return await fastify.UserRepository.storeUser(fastify.db, userData)
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
