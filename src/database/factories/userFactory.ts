import {faker} from '@faker-js/faker';
import app from "../../app";
import {Selectable} from "kysely";
import {Users} from "kysely-codegen";

export default async function generateUser(numberOfUsersForCreation: number = 1): Promise<Selectable<Users>[]> {

    let usersCreated = 0;

    let users: Selectable<Users>[] = [];
    while (usersCreated < numberOfUsersForCreation) {

        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            profile_picture_path: faker.image.avatar()
        }

        const dbUser = await app.db.transaction().execute(async (transaction) => {
            const emailExists = await transaction
                .selectFrom('users')
                .select('id')
                .where('email', '=', user.email)
                .executeTakeFirst();

            const profilePictureExists = await transaction
                .selectFrom('users')
                .select('id')
                .where('profile_picture_path', '=', user.profile_picture_path)
                .executeTakeFirst();

            if (emailExists || profilePictureExists) return undefined;

            const dbUser = await transaction.insertInto('users')
                .values({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    profile_picture_path: user.profile_picture_path
                })
                .returningAll()
                .executeTakeFirst();


            if(dbUser){
                usersCreated++

                return dbUser;
            }
            return undefined;

        })

        if(dbUser){
            users.push(dbUser);
        }

    }

    return users;
}
