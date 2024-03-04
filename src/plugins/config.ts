import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'
import { Type } from '@sinclair/typebox'
export default fp(
  async (fastify, opts) => {
    const schema = Type.Object({
      PORT: Type.String({ default: '3000' }),
      APP_ENV: Type.String({default: 'local'})
    })
    fastify.register(fastifyEnv, {
      schema,
      dotenv: true
    })
  },
  {
    name: 'config'
  }
)

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string,
      APP_ENV: string
    }
  }
}
