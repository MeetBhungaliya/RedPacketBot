import { Response } from 'express'

declare global {
  namespace Express {
    interface Response {
      reply: (response: { code: number; message: string }, data?: unknown, header?: Record<string, string>) => void
    }
  }
}

export {}
