import { FastifyPluginAsync} from "fastify";
import {RouteConfig} from "../../../types/customTypes";
import {Selectable} from "kysely";
import {Users} from "kysely-codegen";



const userRouteAutohooks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.decorateRequest('user', null);
    fastify.addHook<{},RouteConfig>('onRequest', (request, reply, done) => {
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
declare module 'fastify' {
    interface FastifyRequest {
        user: Selectable<Users> | null
    }
}
export default userRouteAutohooks
