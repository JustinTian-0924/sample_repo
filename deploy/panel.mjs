import { spawn } from 'node:child_process'
import path from 'node:path'

import { ensureMigrations } from './check-migrations.mjs'

// Pterodactyl runs one explicitly selected action per start.
const action = process.env.APP_ACTION || 'start'
const actions = {
  install: ['ci', '--include=dev', '--include=optional'],
  build: ['run', 'build'],
  migrate: ['run', 'payload', '--', 'migrate'],
}

try {
  if (!['install', 'build', 'migrate', 'start'].includes(action)) {
    throw new Error('APP_ACTION must be install, build, migrate, or start.')
  }
  if (action !== 'install') ensureMigrations()

  let command = 'npm'
  let args = actions[action]
  if (action === 'start') {
    const port = Number(process.env.SERVER_PORT)
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('SERVER_PORT must be a valid Pterodactyl allocation port.')
    }
    command = process.execPath
    args = [path.resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '0.0.0.0', '--port', String(port)]
  }

  const child = spawn(command, args, {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: action === 'install' ? 'development' : 'production' },
  })
  const interrupt = () => child.kill('SIGINT')
  const terminate = () => child.kill('SIGTERM')
  const cleanup = () => {
    process.removeListener('SIGINT', interrupt)
    process.removeListener('SIGTERM', terminate)
  }
  process.on('SIGINT', interrupt)
  process.on('SIGTERM', terminate)
  child.once('error', (error) => {
    cleanup()
    console.error(error.message)
    process.exitCode = 1
  })
  child.once('exit', (code, signal) => {
    cleanup()
    process.exitCode = code ?? (signal === 'SIGINT' ? 130 : 143)
  })
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
