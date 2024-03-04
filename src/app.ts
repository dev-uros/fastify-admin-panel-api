import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'desm'
import ajvErrors from 'ajv-errors'
import ajvKeywords from 'ajv-keywords'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

// export async function build(opts: {}) {
//   const app = Fastify(opts)
// }
let logger
if (process.stdout.isTTY) {
  logger = { transport: { target: 'pino-pretty' } }
} else {
  logger = true
}

const app = Fastify({
  logger: logger,
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      [
        ajvErrors,
        {
          keepErrors: false,
          singleError: false
        }
      ],
      ajvKeywords
    ]
  }
})

app.withTypeProvider<TypeBoxTypeProvider>()

await app.register(AutoLoad, {
  dir: join(import.meta.url, 'plugins'),
  forceESM: true,
  encapsulate: false
})

await app.register(AutoLoad, {
  dir: join(import.meta.url, 'modules'),
  encapsulate: false,
  forceESM: true,
  maxDepth: 1
})

export default app
