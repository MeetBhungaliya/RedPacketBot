import express from 'express'
import { getusers, getcodes } from '../controller/data'

const router = express.Router()

router.get('/users', getusers)

router.get('/codes', getcodes)

export default router
