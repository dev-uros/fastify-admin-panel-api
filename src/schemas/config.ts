import { Static, Type } from '@sinclair/typebox'

export const configSchema = Type.Object(
  {
    PORT: Type.String({
      default: '3000',
      description: 'Application port',
    }),
    APP_ENV: Type.String({
      default: 'local',
      description: 'Application environment'
    }),
    HOST: Type.String({
      default: '127.0.0.1',
      description: 'Application host'
    }),
    DATABASE_NAME: Type.String({
      description: 'Application database name',
      default: 'fastify_admin_panel'
    }),
    DATABASE_HOST: Type.String({
      description: 'Application database host',
      default: 'localhost'
    }),
    DATABASE_PORT: Type.String({
      description: 'Application database port',
      default: '7604'
    }),
    DATABASE_USER: Type.String({
      description: 'Application database user',
      default: 'postgres'
    }),
    DATABASE_PASSWORD: Type.String({
      description: 'Application database password',
      default: 'postgres'
    }),
    DATABASE_URL: Type.String({
      description: 'Application database url',
      default: 'postgres://postgres:postgres@localhost:7604/fastify_admin_panel'
    })
  },
  {
    additionalProperties: false
  }
)

export type ConfigSchemaType = Static<typeof configSchema>
