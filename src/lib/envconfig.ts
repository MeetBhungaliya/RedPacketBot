import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.development'

if (dotenv.config({ path: envFile }).error) {
  console.error('No environment variable found')
  process.exit(1)
}
