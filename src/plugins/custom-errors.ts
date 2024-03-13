import { FastifyError } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
  fastify.decorate('throwValidationError', (message: string): FastifyError => {
    const error = new Error(message) as FastifyError
    error.statusCode = 422
    throw error
  })
})

declare module 'fastify' {
  export interface FastifyInstance {
    throwValidationError(message: string): FastifyError
  }
}
