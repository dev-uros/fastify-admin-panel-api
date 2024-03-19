import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import fs from "fs";

export default fp(
    async (fastify, opts) => {

// secret as an object of RSA keys (without passphrase)
// the files are loaded as strings
        fastify.register(fastifyJwt, {
            secret: {
                private: fs.readFileSync(`${fastify.storagePath}/keys/private.pem`, 'utf8'),
                public: fs.readFileSync(`${fastify.storagePath}/keys/public.pem`, 'utf8')
            },
            sign: {algorithm: 'RS256'}
        })
    },
    {
        name: 'jwt',
        dependencies: ['appRootPath']
    }
)

