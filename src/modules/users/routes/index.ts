import {
    FastifyPluginAsync,
} from 'fastify'
import {
    userListResponseSchema,
    UserListResponseSchemaType
} from '../schemas/userListSchema'
import {
    userStoreRequestSchema,
    UserStoreRequestSchemaType,
    userStoreResponseSchema
} from '../schemas/userStoreSchema'
import fastifyMultipart from '@fastify/multipart'
import {
    badRequestSchema,
    failedValidationSchema,
    serverErrorSchema
} from 'schemas/errors'
import {
    userUpdateParamSchema,
    userUpdateRequestSchema,
    UserUpdateRequestSchemaType,
    userUpdateResponseSchema
} from '../schemas/userUpdateSchema'
import {
    userUpdateProfilePictureParamSchema,
    userUpdateProfilePictureRequestSchema,
    UserUpdateProfilePictureRequestSchemaType,
    userUpdateProfilePictureResponseSchema
} from '../schemas/userUpdateProfilePictureSchema'
import {
    userShowParamSchema,
    userShowResponseSchema
} from '../schemas/userShowSchema'
import {
    userDeleteParamSchema,
    userDeleteResponseSchema
} from '../schemas/deleteUserSchema'
import {RouteConfig} from "../../../types/customTypes";

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    async function onFile(part: any) {
        part.value = {
            filename: part.filename,
            mimetype: part.mimetype,
            file: await part.toBuffer()
        }
    }

    await fastify.register(fastifyMultipart, {
        attachFieldsToBody: 'keyValues',
        onFile,
        limits: {
            fieldNameSize: 100, // Max field name size in bytes
            fieldSize: 100, // Max field value size in bytes
            fields: 10, // Max number of non-file fields
            fileSize: 1000000, // For multipart forms, the max file size in bytes
            files: 1, // Max number of file fields
            headerPairs: 2000, // Max number of header key=>value pairs
            parts: 1000 // For multipart forms, the max number of parts (fields + files)
        }
    })

    fastify.route<
        { Reply: UserListResponseSchemaType },
        RouteConfig
    >({
        url: '/',
        method: 'GET',
        config: {routeName: 'User List'},
        preHandler: (request, reply, done) => {
            console.log(request.user);
            console.log(request.routeOptions.config.routeName)
            done()
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'User list',
                data: await fastify.UserService.getUserList()
            })
        },
        schema: {
            tags: ['users'],
            summary: 'User List',
            description: 'Returns list of all users',
            response: {
                200: userListResponseSchema,
                500: serverErrorSchema
            }
        }
    })

    fastify.route<
        { Body: UserStoreRequestSchemaType },
        RouteConfig
    >({
        url: '/',
        method: 'POST',
        config: {
            routeName: 'Store User'
        },
        preHandler: async (request, reply) => {
            const allowProfilePictureMimeTypes = ['image/jpeg', 'image/png']
            if (
                !allowProfilePictureMimeTypes.includes(
                    request.body.profile_picture_path.mimetype
                )
            ) {
                fastify.throwValidationError(
                    `Profile picture must be in jpg, jpeg or png format!`
                )
            }
            const emailExists = await fastify.UserRepository.checkDoesUserEmailExist(
                fastify.db,
                request.body.email
            )
            if (emailExists) {
                fastify.throwValidationError(
                    `E-mail: ${request.body.email} already taken!`
                )
            }
            fastify.log.info('Hello from users STORE pre handler!')
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'Successfully created user',
                data: await fastify.UserService.storeUser(request.body)
            })
        },
        schema: {
            tags: ['users'],
            summary: 'Store User',
            description: 'Store new user',
            consumes: ['multipart/form-data'],
            body: userStoreRequestSchema,
            response: {
                200: userStoreResponseSchema,
                400: badRequestSchema,
                422: failedValidationSchema,
                500: serverErrorSchema
            }
        }
    })

    fastify.route<{
        Body: UserUpdateRequestSchemaType
        Params: { id: number }
    },
        RouteConfig
    >({
        url: '/:id',
        method: ['PATCH', 'PUT'],
        config: {
            routeName: 'Update User'
        },
        preHandler: async (request, reply) => {
            const userExists = await fastify.UserRepository.getUserById(
                fastify.db,
                request.params.id
            )

            if (!userExists) {
                fastify.throwValidationError('User for update not found')
            }

            const emailExists =
                await fastify.UserRepository.checkDoesUserEmailExistIgnoringUser(
                    fastify.db,
                    request.body.email,
                    request.params.id
                )
            if (emailExists) {
                fastify.throwValidationError(
                    `E-mail: ${request.body.email} already taken!`
                )
            }
            fastify.log.info('Hello from users UPDATE pre handler!')
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'Successfully updated user',
                data: await fastify.UserService.updateUser(
                    request.body,
                    request.params.id
                )
            })
        },
        schema: {
            tags: ['users'],
            summary: 'Update user',
            description: 'Update existing user',
            consumes: ['application/json'],
            body: userUpdateRequestSchema,
            params: userUpdateParamSchema,
            response: {
                200: userUpdateResponseSchema,
                400: badRequestSchema,
                422: failedValidationSchema,
                500: serverErrorSchema
            }
        }
    })

    fastify.route<{
        Body: UserUpdateProfilePictureRequestSchemaType
        Params: { id: number }
    },
        RouteConfig
    >({
        url: '/:id/update-profile-picture',
        config: {
            routeName: 'Update User Profile Picture'
        },
        method: ['PATCH', 'PUT'],
        preHandler: async (request, reply) => {
            const allowProfilePictureMimeTypes = ['image/jpeg', 'image/png']
            if (
                !allowProfilePictureMimeTypes.includes(
                    request.body.profile_picture_path.mimetype
                )
            ) {
                fastify.throwValidationError(
                    `Profile picture must be in jpg, jpeg or png format!`
                )
            }
            const userExists = await fastify.UserRepository.getUserById(
                fastify.db,
                request.params.id
            )

            if (!userExists) {
                fastify.throwValidationError('User for update not found')
            }
            fastify.log.info('Hello from users UPDATE pre handler!')
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'Successfully updated user',
                data: await fastify.UserService.updateUserProfilePicture(
                    request.body,
                    request.params.id
                )
            })
        },
        schema: {
            tags: ['users'],
            summary: 'Update user profile picture',
            description: 'Update existing user profile picture',
            consumes: ['multipart/form-data'],
            body: userUpdateProfilePictureRequestSchema,
            params: userUpdateProfilePictureParamSchema,
            response: {
                200: userUpdateProfilePictureResponseSchema,
                400: badRequestSchema,
                422: failedValidationSchema,
                500: serverErrorSchema
            }
        }
    })

    fastify.route<{
        Params: { id: number }
    },
        RouteConfig
    >({
        url: '/:id',
        config: {
            routeName: 'Show User'
        },
        method: 'GET',
        preHandler: async (request, reply) => {
            const userExists = await fastify.UserRepository.getUserById(
                fastify.db,
                request.params.id
            )

            if (!userExists) {
                fastify.throwValidationError('User for show not found')
            }
            fastify.log.info('Hello from users SHOW pre handler!')
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'Successfully shown user',
                data: await fastify.UserRepository.getUserById(
                    fastify.db,
                    request.params.id
                )
            })
        },
        schema: {
            tags: ['users'],
            summary: 'Show user',
            description: 'Show user details',
            consumes: ['application/json'],
            params: userShowParamSchema,
            response: {
                200: userShowResponseSchema,
                400: badRequestSchema,
                422: failedValidationSchema,
                500: serverErrorSchema
            }
        }
    })

    fastify.route<{
        Params: { id: number }
    },
        RouteConfig
    >({
        url: '/:id',
        config: {
            routeName: 'Delete User'
        },
        method: 'DELETE',
        preHandler: async (request, reply) => {
            const userExists = await fastify.UserRepository.getUserById(
                fastify.db,
                request.params.id
            )

            if (!userExists) {
                fastify.throwValidationError('User for show not found')
            }
            fastify.log.info('Hello from users SHOW pre handler!')
        },
        handler: async (request, reply) => {
            return reply.send({
                message: 'Successfully deleted user',
                data: await fastify.UserService.deleteUser(request.params.id)
            })
        },
        schema: {
            tags: ['users'],
            summary: 'Delete user',
            description: 'Deletes a user',
            consumes: ['application/json'],
            params: userDeleteParamSchema,
            response: {
                200: userDeleteResponseSchema,
                400: badRequestSchema,
                422: failedValidationSchema,
                500: serverErrorSchema
            }
        }
    })
}

export default userRoutes
