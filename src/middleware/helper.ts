import { NextFunction, Request, Response } from 'express'

const notFound = (_: Request, res: Response) => {
  return res.reply({ code: 404, message: 'Route not found' })
}

const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  global.log.error(`${req.method} ${req.url}`)
  global.log.error('body -> ', req.body)
  global.log.error(error.stack)
  return next(error)
}

const errorHandler = (error: Error, req: Request, res: Response) => {
  res.status(500).json({
    code: 500,
    message: error.message || 'Internal Server Error'
  })
}

export { errorLogger, notFound, errorHandler }
