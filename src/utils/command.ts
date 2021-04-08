import { spawn } from 'child_process'

export function runCommand(command: string): Promise<boolean> {
  return new Promise(resolve => {
    if (!command) resolve(false)
    const commandSplited = command.split(' ')
    spawn(commandSplited[0], commandSplited.slice(1), {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'inherit'
    })
      .once('close', code => resolve(code === 0))
      .once('error', () => resolve(false))
  })
}
