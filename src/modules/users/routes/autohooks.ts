import { FastifyPluginAsync} from "fastify";


const userRouteAutohooks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.decorateRequest('user', null);
    fastify.addHook('onRequest', (request, reply, done) => {
        //authenticate user
        //authorize user

        if(request.routeOptions.config.routeName){
            console.log(request.routeOptions.config.routeName);
        }
        // Some code
        console.log('cao cao from request pre handler idemo njiha')
        done()
    })
}

export default userRouteAutohooks
