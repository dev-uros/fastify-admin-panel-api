import fp from 'fastify-plugin'
import appRootPath from 'app-root-path'

export default fp(
  async (fastify, opts) => {
    fastify.decorate('appRootPath', appRootPath.toString())
  },
  {
    name: 'appRootPath'
  }
)
declare module 'fastify' {
  export interface FastifyInstance {
    appRootPath: string
  }
}
