import { Request, Response, NextFunction } from 'express'

const routeConfig = (req: Request, res: Response, next: NextFunction) => {
  res.reply = function ({ code, message }, data = {}, header = {}) {
    this.status(code).set(header).json({ message, data })
  }
  next()
}

export default routeConfig
