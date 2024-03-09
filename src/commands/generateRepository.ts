import fs, {readdir, stat} from 'fs/promises';
import path from 'path';
import {input, select} from "@inquirer/prompts";

// Function to get all subfolder names within a folder
async function getAllSubfolders(folderPath: string) {

    // Read contents of the directory
    const contents = await readdir(folderPath);


    // Filter out only directories
    const subfolders = await Promise.all(contents.map(async item => {
        // Get the full path of the item
        const itemPath = path.join(folderPath, item);
        // Check if it's a directory
        const stats = await stat(itemPath);
        if (stats.isDirectory()) {
            return item;
        }
    }));

    // Filter out any undefined values (non-directories)
    return subfolders.filter(Boolean);

}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const rootPath = path.resolve(__dirname, '../'); // Adjust '../' if needed
const folderPath = path.join(rootPath, 'modules'); // Change 'your-folder-name' to your folder name
const projectModules = await getAllSubfolders(folderPath)

const moduleOptions: { name: string, value: string }[] = [];
if (projectModules.length > 0) {
    projectModules.forEach((module) => {
        if (typeof module === 'string') {
            moduleOptions.push({name: module, value: module})
        }
    })
}
const selectedModuleForRepositoryCreation = await select({
    message: 'Select a module for a new repository',
    choices: moduleOptions
});


let newRepositoryName = await input({
    message: 'Enter your repository name',
    validate: (repositoryName: string) => {
        if (!repositoryName.trim()) return 'You have to enter repository name'
        return true;
    },
    transformer: (repositoryName: string) => repositoryName.trim()
});

newRepositoryName = newRepositoryName + 'Repository.ts'
let newRepositoryInterfaceName = newRepositoryName + 'RepositoryInterface.ts';

const repositoryPath = path.join(__dirname, '..', '..', 'src', 'modules', selectedModuleForRepositoryCreation, 'repositories', newRepositoryName);
const modulePath = path.join(__dirname, '..', '..', 'src', 'modules', selectedModuleForRepositoryCreation);
try {
    // Check if the module directory already exists
    await fs.access(repositoryPath);
    console.error(`Module '${repositoryPath}' already exists.`);
    process.exit(1);
} catch (error) {
    // If the module directory doesn't exist, proceed to create it
}
//


// Create files
const files = [
    {path: path.join(modulePath, 'repositories', newRepositoryName), content: generateRepositoryContent()},
    {
        path: path.join(modulePath, 'repositories', newRepositoryInterfaceName),
        content: generateRepositoryInterfaceContent()
    },
];

await Promise.all(files.map((file: { path: string, content: string }) => fs.writeFile(file.path, file.content)));


function generateRepositoryContent() {
    const repositoryName = newRepositoryName.charAt(0).toUpperCase() + newRepositoryName.slice(1);
    return `import fp from "fastify-plugin";
import ${newRepositoryInterfaceName} from "./${newRepositoryName}RepositoryInterface";
export default fp(async(fastify, opts)=>{

    class ${repositoryName}Repository implements ${repositoryName}RepositoryInterface{

    }

    await fastify.decorate('${repositoryName}Repository', new ${repositoryName}Repository())
}, {
    name: '${repositoryName}Repository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        ${repositoryName}Repository: ${repositoryName}RepositoryInterface
    }
}
`;
}

function generateRepositoryInterfaceContent() {
    const interfaceName = newRepositoryName.charAt(0).toUpperCase() + newRepositoryName.slice(1);
    return `export default interface ${interfaceName}RepositoryInterface {

}`;
}

