import express from 'express'
import webhookRoute from './webhook'

const router = express.Router()

router.use('/api/v1/', webhookRoute)

export default router
