import express from 'express'
import { getWebhook, setWebhook, deleteWebhook } from '../controller/webhook'

const router = express.Router()

router.get('/webhook', getWebhook)

router.get('/setWebhook', setWebhook)

router.get('/deleteWebhook', deleteWebhook)

export default router
