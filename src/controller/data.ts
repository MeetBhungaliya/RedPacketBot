import { Request, Response } from 'express'
import storage from 'node-persist'

const getusers = async (req: Request, res: Response) => {
  const users = await storage.get('users')

  return res.reply({ code: 200, message: 'users retrived successfully' }, users)
}

const getcodes = async (req: Request, res: Response) => {
  const codes = await storage.get('codes')

  return res.reply({ code: 200, message: 'cosdes retrived successfully' }, codes)
}

export { getusers, getcodes }
