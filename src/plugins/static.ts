import fp from 'fastify-plugin'
import fastifyStatic from "@fastify/static";
import path from "node:path";

export default fp(
    async (fastify, opts) => {
        const __dirname = path.dirname(new URL(import.meta.url).pathname)

        fastify.register(fastifyStatic, {
            root: path.join(__dirname, '..', 'public', 'user-profile-pictures'),
            prefix: '/public/user-profile-pictures/',
            constraints: {host: `${fastify.config.HOST}:${fastify.config.PORT}`}
        })
    },
    {
        name: 'static',
        dependencies: ['config']
    }
)

