import fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';

async function generateModule(moduleName: string) {
    if (!moduleName) {
        console.error('Module name is required.');
        process.exit(1);
    }
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const modulePath = path.join(__dirname, '..', '..', 'src', 'modules', moduleName);

    try {
        // Check if the module directory already exists
        await fs.access(modulePath);
        console.error(`Module '${moduleName}' already exists.`);
        process.exit(1);
    } catch (error) {
        // If the module directory doesn't exist, proceed to create it
    }

    const moduleDirectories = [
        modulePath,
        path.join(modulePath, 'repositories'),
        path.join(modulePath, 'routes'),
        path.join(modulePath, 'schemas'),
        path.join(modulePath, 'services')
    ];

    // Create directories
    await Promise.all(moduleDirectories.map(dir => fs.mkdir(dir, {recursive: true})));

    // Create files
    const files = [
        {path: path.join(modulePath, 'README.md'), content: generateModuleReadmeContent()},
        {path: path.join(modulePath, 'index.ts'), content: generateModuleIndexContent()},
        {path: path.join(modulePath, 'repositories', `${moduleName}Repository.ts`), content: generateRepositoryContent()},
        // path.join(modulePath, 'repositories', `${moduleName}RepositoryInterface.ts`),
        // path.join(modulePath, 'routes', 'index.ts'),
        // path.join(modulePath, 'schemas', 'index.ts'),
        // path.join(modulePath, 'services', `${moduleName}Service.ts`),
        // path.join(modulePath, 'services', `${moduleName}ServiceInterface.ts`)
    ];

    await Promise.all(files.map((file: {path: string, content: string}) => fs.writeFile(file.path, file.content)));
}

function generateModuleIndexContent() {
    return `import { FastifyPluginAsync } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin.js";
import AutoLoad from "@fastify/autoload";
import { join } from "desm";

const ${moduleName}Domain: FastifyPluginAsync = async (fastify, opts: FastifyPluginOptions): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'repositories'),
    ignorePattern: /Interface\\.(js|ts)$/,
    forceESM: true,
  });

  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'services'),
    ignorePattern: /Interface\\.(js|ts)$/,
    forceESM: true,
  });

  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    options: {
      prefix: opts.prefix,
    },
    forceESM: true,
    encapsulate: true
  });
};

export default ${moduleName}Domain;
`;
}

function generateModuleReadmeContent(){
    return `# ${moduleName} module

## This is a module that encapsulates ${moduleName} functionalities within the application

### Routes:

| URL    | Method | Description               |
|--------|--------|---------------------------|
| /${moduleName} | GET    | Returns the list of ${moduleName} |

### [Swagger Documentation](http://127.0.0.1:3000/documentation/static/index.html#/${moduleName})
`;
}


function generateRepositoryContent() {
    return `import fp from "fastify-plugin";
import ${moduleName}RepositoryInterface from "./${moduleName}RepositoryInterface";
export default fp(async(fastify, opts)=>{

    class ${moduleName}Repository implements ${moduleName}RepositoryInterface{

    }

    await fastify.decorate('${moduleName}Repository', new ${moduleName}Repository())
}, {
    name: '${moduleName}Repository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        ${moduleName}Repository: ${moduleName}RepositoryInterface
    }
}
`;
}

// Parse command-line arguments
const argv = yargs(process.argv.slice(2))
    .option('name', {
        alias: 'n',
        describe: 'Name of the module',
        demandOption: true,
        type: 'string'
    })
    .parse(process.argv.slice(2)) as unknown as { name: string };

const moduleName = argv.name;

generateModule(moduleName).catch(error => {
    console.error('Error:', error);
    process.exit(1);
});