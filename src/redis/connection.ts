import Redis from 'ioredis'

const redis = new Redis({
  username: process.env.REDIS_USERNAME,
  host: process.env.REDIS_HOST_URL,
  password: process.env.REDIS_PASSWORD,
  port: +process.env.REDIS_PORT,
  maxRetriesPerRequest: 1,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  connectTimeout: 10000,
  enableReadyCheck: true,
  reconnectOnError: (err) => err.message.includes('ECONNRESET') || err.message.includes('ETIMEDOUT'),
  autoResubscribe: true,
  enableAutoPipelining: false,
  lazyConnect: false
})

export default redis
