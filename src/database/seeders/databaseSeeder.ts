import generateUser from "../factories/userFactory";

await generateUser(10);

console.log('database seeder executed');

process.exit();
