import express from 'express'
import webhookRoute from './webhook'
import dataRoute from './data'

const router = express.Router()

router.use('/', webhookRoute)

router.use('/api/v1', dataRoute)

export default router
