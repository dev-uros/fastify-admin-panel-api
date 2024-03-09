import fs, { readdir, stat } from 'fs/promises'
import path from 'path'
import { input, select } from '@inquirer/prompts'

// Function to get all subfolder names within a folder
async function getAllSubfolders(folderPath: string) {
  // Read contents of the directory
  const contents = await readdir(folderPath)

  // Filter out only directories
  const subfolders = await Promise.all(
    contents.map(async item => {
      // Get the full path of the item
      const itemPath = path.join(folderPath, item)
      // Check if it's a directory
      const stats = await stat(itemPath)
      if (stats.isDirectory()) {
        return item
      }
    })
  )

  // Filter out any undefined values (non-directories)
  return subfolders.filter(Boolean)
}

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const rootPath = path.resolve(__dirname, '../')
const folderPath = path.join(rootPath, 'modules')
const projectModules = await getAllSubfolders(folderPath)

const moduleOptions: { name: string; value: string }[] = []
if (projectModules.length > 0) {
  projectModules.forEach(module => {
    if (typeof module === 'string') {
      moduleOptions.push({ name: module, value: module })
    }
  })
}
const selectedModuleForServiceCreation = await select({
  message: 'Select a module for a new service',
  choices: moduleOptions
})

let newServiceName = await input({
  message: 'Enter your service name',
  validate: (serviceName: string) => {
    if (!serviceName.trim()) return 'You have to enter repository name'
    return true
  },
  transformer: (serviceName: string) => serviceName.trim()
})

// newRepositoryName = newRepositoryName + 'Repository.ts'
// let newRepositoryInterfaceName = newRepositoryName + 'RepositoryInterface.ts';

const servicePath = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'modules',
  selectedModuleForServiceCreation,
  'services',
  newServiceName
)
const modulePath = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'modules',
  selectedModuleForServiceCreation
)
try {
  // Check if the module directory already exists
  await fs.access(servicePath)
  console.error(`Module '${servicePath}' already exists.`)
  process.exit(1)
} catch (error) {
  // If the module directory doesn't exist, proceed to create it
}
//

// Create files
const files = [
  {
    path: path.join(modulePath, 'services', `${newServiceName}Service.ts`),
    content: generateServiceContent()
  },
  {
    path: path.join(
      modulePath,
      'services',
      `${newServiceName}ServiceInterface.ts`
    ),
    content: generateServiceInterfaceContent()
  }
]

await Promise.all(
  files.map((file: { path: string; content: string }) =>
    fs.writeFile(file.path, file.content)
  )
)

function generateServiceContent() {
  const serviceNameCapitalized =
    newServiceName.charAt(0).toUpperCase() + newServiceName.slice(1)
  return `import fp from 'fastify-plugin'
import {${serviceNameCapitalized}ServiceInterface} from "./${newServiceName}ServiceInterface";

export default fp(async(fastify, opts)=>{

    class ${serviceNameCapitalized}Service implements ${serviceNameCapitalized}ServiceInterface{

    }

    fastify.decorate('${serviceNameCapitalized}Service', new ${serviceNameCapitalized}Service());
}, {
    name: '${serviceNameCapitalized}Service',
    dependencies: ['database', '${serviceNameCapitalized}Repository']
})`
}

function generateServiceInterfaceContent() {
  const interfaceName =
    newServiceName.charAt(0).toUpperCase() + newServiceName.slice(1)
  return `export interface ${interfaceName}ServiceInterface{

    }`
}
