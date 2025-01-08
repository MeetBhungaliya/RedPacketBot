import chalk from 'chalk'

class Logger {
  blue = (...args: unknown[]) => console.log(chalk.blue(...args))
  red = (...args: unknown[]) => console.log(chalk.red(...args))
  green = (...args: unknown[]) => console.log(chalk.green(...args))
  yellow = (...args: unknown[]) => console.log(chalk.yellow(...args))
  magenta = (...args: unknown[]) => console.log(chalk.magenta(...args))
  cyan = (...args: unknown[]) => console.log(chalk.cyan(...args))
  white = (...args: unknown[]) => console.log(chalk.white(...args))
  black = (...args: unknown[]) => console.log(chalk.black(...args))

  error = (...args: unknown[]) => console.error(chalk.red(`[ERROR]`, ...args))
  warn = (...args: unknown[]) => console.warn(chalk.yellow(`[WARN]`, ...args))
  info = (...args: unknown[]) => console.info(chalk.blue(`[INFO]`, ...args))
  trace = (...args: unknown[]) => console.trace(chalk.magenta(`[TRACE]`, ...args))
}

export default new Logger()
