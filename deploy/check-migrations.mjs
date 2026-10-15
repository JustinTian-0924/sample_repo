import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export function ensureMigrations() {
  const directory = path.resolve('src/migrations')
  const files = existsSync(directory) ? readdirSync(directory) : []
  const hasMigration = files.some(
    (file) => file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.d.ts'),
  )

  if (!files.includes('index.ts') || !hasMigration) {
    throw new Error(
      'Missing Payload migrations. Generate and review an initial migration with npm run payload -- migrate:create initial, then include src/migrations in the deployment source.',
    )
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  ensureMigrations()
}
