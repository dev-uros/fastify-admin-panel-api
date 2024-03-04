import app from './app'

import closeWithGrace from 'close-with-grace'

app.listen({ host: app.config.HOST, port: Number(app.config.PORT) }).then(() => {
  console.log(app.config.PORT)
})

closeWithGrace(async ({ err }) => {
  console.log('udje ovde 2')
  if (err) {
    app.log.error({ err }, 'server closing due to error')
  }
  app.log.info('shutting down gracefully')
  await app.db.destroy()
  await app.close()
})
