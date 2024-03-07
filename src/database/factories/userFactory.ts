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
            const emailExists = await app.UserRepository.checkDoesUserEmailExist(transaction, user.email)

            const profilePictureExists = await app.UserRepository.checkDoesUserProfilePictureExist(transaction, user.profile_picture_path)

            if (emailExists || profilePictureExists) return undefined;

            const dbUser = await app.UserRepository.storeUser(app.db, user);

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
