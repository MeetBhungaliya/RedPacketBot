import dotenv from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.development'

if (dotenv.config({ path: path.resolve(process.cwd(), envFile) }).error) {
  console.error('No environment variable found')
  process.exit(1)
}
