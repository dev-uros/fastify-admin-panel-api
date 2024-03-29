import fp from 'fastify-plugin'
import appRootPath from 'app-root-path'

export default fp(
    async (fastify, opts) => {
        await fastify.decorate('appRootPath', appRootPath.toString())
        await fastify.decorate('publicPath', `${fastify.appRootPath}/src/public/`)
        await fastify.decorate('storagePath', `${fastify.appRootPath}/src/storage/`)
        await fastify.decorate(
            'userProfilePicturePath',
            (fileName: string): {publicPath: string, uploadPath: string} => {
                return {
                    publicPath: `${fastify.config.BASE_URL}/public/user-profile-pictures/${fileName}`,
                    uploadPath: `${fastify.appRootPath}/src/public/user-profile-pictures/${fileName}`
                }


            }
        )
    },

    {
        dependencies: ['config'],
        name: 'appRootPath'
    }
)
declare module 'fastify' {
    export interface FastifyInstance {
        appRootPath: string
        publicPath: string
        storagePath: string

        userProfilePicturePath(fileName: string): {publicPath: string, uploadPath: string}
    }
}
