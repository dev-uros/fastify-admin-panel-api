import app from './app'

import closeWithGrace from 'close-with-grace'

app.listen({ host: '127.0.0.1', port: 3001 }).then(() => {
  console.log(app.config.PORT)
})

closeWithGrace(async ({ err }) => {
  console.log('udje ovde 2')
  if (err) {
    app.log.error({ err }, 'server closing due to error')
  }
  app.log.info('shutting down gracefully')
  // await app.db.destroy()
  await app.close()
})
