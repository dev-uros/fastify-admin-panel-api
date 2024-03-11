import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {

    fastify.setErrorHandler(function (error, request, reply) {
        // Log error
        this.log.error(error)
        // Send error response
        if(error.code === 'FST_ERR_VALIDATION'){

            // return reply.status(400).send(error);
            return reply.status(400).send({ errors: error.validation} )
            return reply.status(400).send({
                errors: error.validation!.map(error => {
                    return error.message;
                })
            })
        }else{
            this.log.error(error)
            return reply.status(500).send(error.validation);
        }
    })
})

