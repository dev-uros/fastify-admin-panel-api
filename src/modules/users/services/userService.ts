import fp from 'fastify-plugin'
import { UserServiceInterface } from './userServiceInterface'
import { Insertable, Selectable } from 'kysely'
import { Users } from 'kysely-codegen'

export default fp(
  async (fastify, opts) => {
    class UserService implements UserServiceInterface {
      async getUserList(): Promise<Selectable<Users>[]> {
        const data = await fastify.UserRepository.getUserList(fastify.db)
        console.log(data[0].created_at)
        return await fastify.UserRepository.getUserList(fastify.db)
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
