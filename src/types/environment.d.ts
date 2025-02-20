declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      API_ID: number
      API_HASH: string
      BOT_TOKEN: string
      DB_URL: string
      REDIS_USERNAME: string
      REDIS_HOST_URL: string
      REDIS_PASSWORD: string
      REDIS_PORT: string
    }
  }
}

export {}
