declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      API_ID: number
      API_HASH: string
      BOT_TOKEN: string
      DB_URL: string
    }
  }
}

export {}
