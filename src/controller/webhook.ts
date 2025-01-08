import { Request, Response } from 'express'
import { wait } from '../lib/helper'
import { connect } from '../telegram/connect'

const getWebhook = (req: Request, res: Response) => {
  return res.reply({ code: 200, message: 'Webhook data retrived successfully' }, global.webhook)
}

const setWebhook = async (req: Request, res: Response) => {
  const { phone = null, code = null, password = null } = req.query

  global.webhook = {
    ...global.webhook,
    phone: phone as string | null,
    code: code as string | null,
    password: password as string | null
  }

  console.log(global.webhook)

  await wait(1000)

  return res.reply({ code: 200, message: 'Webhook set successfully' }, global.webhook)
}

const deleteWebhook = (req: Request, res: Response) => {
  global.webhook = {
    code: null,
    error: null,
    password: null,
    phone: null
  }

  connect()

  return res.reply({ code: 200, message: 'Webhook data reseted successfully' }, global.webhook)
}

export { getWebhook, setWebhook, deleteWebhook }
