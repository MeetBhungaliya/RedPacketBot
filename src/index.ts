import './lib/envconfig'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import routeConfig from './lib/routeConfig'
import initStorage from './lib/storage'
import routes from './routes'
import { createServer } from 'http'
import { CORS_OPTION } from './constant'
import { errorHandler, errorLogger, notFound } from './middleware/helper'
import { connect } from './telegram/connect'
import { initBot } from './telegram/initBot'

import './globals'

const app = express()

const httpServer = createServer(app)

httpServer.listen(process.env.PORT, async () => {
  await initStorage()
  connect()
  initBot()
  global.log.info(`Spinning on ${process.env.PORT}`)
})

app.use(compression())
app.use(cors(CORS_OPTION))

app.use(routeConfig)

app.use(
  morgan('dev', {
    skip: (req) => req.path === '/health' || req.path === '/favicon.ico'
  })
)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/health', (req, res) => {
  res.reply({ code: 200, message: 'Service is up and running!' }, { timestamp: new Date() })
})

app.use(routes)

app.use('*', notFound)

app.use(errorLogger)

app.use(errorHandler)
