import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error)
    // Send error response
    if (error.code === 'FST_ERR_VALIDATION') {
      // return reply.status(400).send(error);
      // return reply.status(400).send({ errors: error.validation })
      return reply.status(400).send({
        errors: error.validation!.map(error => {
          return error.message
        })
      })
    } else if (error.code === 'FST_REQ_FILE_TOO_LARGE') {
      return reply.status(413).send({
        message: 'File too large!'
      })
    } else if (error.statusCode === 422) {
      console.log('evo me')
      console.log(error.message);
      return reply.status(error.statusCode).send({
        message: error.message
      })
    } else {
      this.log.error(error)
      return reply.status(500).send(error.validation)
    }
  })
})
