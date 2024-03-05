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
        {path: path.join(modulePath, 'repositories', `${moduleName}RepositoryInterface.ts`), content: generateRepositoryInterfaceContent()},
        {path: path.join(modulePath, 'routes', 'index.ts'), content: generateRoutes()},
        {path: path.join(modulePath, 'schemas', 'index.ts'), content: generateSchemas()},
        {path: path.join(modulePath, 'services', `${moduleName}Service.ts`), content: generateServiceContent()},
        {path: path.join(modulePath, 'services', `${moduleName}ServiceInterface.ts`), content: generateServiceInterfaceContent()},
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
    const repositoryName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    return `import fp from "fastify-plugin";
import ${repositoryName}RepositoryInterface from "./${moduleName}RepositoryInterface";
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
    const interfaceName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    return `export default interface ${interfaceName}RepositoryInterface {

}`;
}

function generateRoutes(){

    const moduleNameFirstLetterCapitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    return `import { FastifyPluginAsync } from 'fastify'
import {
  ${moduleName}BootstrapResponseSchema,
  ${moduleNameFirstLetterCapitalized}BootstrapResponseSchemaType
} from '../schemas'

const ${moduleName}Routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: ${moduleNameFirstLetterCapitalized}BootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from ${moduleName} pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /${moduleName}'
      })
    },
    schema: {
      tags: ['${moduleName}'],
      summary: '${moduleNameFirstLetterCapitalized} Domain Module',
      description: '${moduleNameFirstLetterCapitalized} Domain Module Bootstrap',
      response: {
        200: ${moduleName}BootstrapResponseSchema,
      }
    }
  })
}

export default ${moduleName}Routes
`;
}

function generateSchemas(){
    const moduleNameFirstLetterCapitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    return `import { Static, Type } from '@sinclair/typebox'

export const ${moduleName}BootstrapResponseSchema = Type.Object(
  {
    message: Type.String()
  },
  {
    additionalProperties: false
  }
)

export type ${moduleNameFirstLetterCapitalized}BootstrapResponseSchemaType = Static<
  typeof ${moduleName}BootstrapResponseSchema
>
`;
}

function generateServiceContent(){
    const moduleNameFirstLetterCapitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    return `import fp from 'fastify-plugin'
import {${moduleNameFirstLetterCapitalized}ServiceInterface} from "./${moduleName}ServiceInterface";

export default fp(async(fastify, opts)=>{

    class ${moduleNameFirstLetterCapitalized}Service implements ${moduleNameFirstLetterCapitalized}ServiceInterface{

    }

    fastify.decorate('${moduleNameFirstLetterCapitalized}Service', new ${moduleNameFirstLetterCapitalized}Service());
}, {
    name: '${moduleNameFirstLetterCapitalized}Service',
    dependencies: ['database', '${moduleNameFirstLetterCapitalized}Repository']
})`;
}

function generateServiceInterfaceContent(){
    const moduleNameFirstLetterCapitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    return `export interface ${moduleNameFirstLetterCapitalized}ServiceInterface{

}`;
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