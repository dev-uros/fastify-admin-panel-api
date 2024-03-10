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
const selectedModuleForSchemaCreation = await select({
  message: 'Select a module for a new schema',
  choices: moduleOptions
})

let newSchemaName = await input({
  message: 'Enter your schema name',
  validate: (schemaName: string) => {
    if (!schemaName.trim()) return 'You have to enter schema name'
    return true
  },
  transformer: (schemaName: string) => schemaName.trim()
})

// newRepositoryName = newRepositoryName + 'Repository.ts'
// let newRepositoryInterfaceName = newRepositoryName + 'RepositoryInterface.ts';

const servicePath = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'modules',
  selectedModuleForSchemaCreation,
  'schemas',
  newSchemaName
)
const modulePath = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'modules',
  selectedModuleForSchemaCreation
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
    path: path.join(modulePath, 'schemas', `${newSchemaName}Schema.ts`),
    content: generateSchemaContent()
  }
]

await Promise.all(
  files.map((file: { path: string; content: string }) =>
    fs.writeFile(file.path, file.content)
  )
)

function generateSchemaContent(){
  const moduleNameFirstLetterCapitalized = newSchemaName.charAt(0).toUpperCase() + newSchemaName.slice(1);

  return `import { Static, Type } from '@sinclair/typebox'

export const ${newSchemaName}Schema = Type.Object(
{
  message: Type.String()
},
{
  additionalProperties: false
}
)

export type ${moduleNameFirstLetterCapitalized}SchemaType = Static<
typeof ${newSchemaName}Schema
>
`;
}
