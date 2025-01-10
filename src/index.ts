import './lib/envconfig'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import os from 'os'
import process from 'process'
import axios from 'axios'
import moment from 'moment-timezone'
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

app.get('/health', async (req, res) => {
  const memoryUsage = process.memoryUsage()
  const cpuUsage = os.cpus().map((cpu) => ({
    model: cpu.model,
    speed: cpu.speed,
    times: cpu.times
  }))

  const uptime = process.uptime()
  const startTime = new Date(Date.now() - process.uptime() * 1000)
  const currentTimestamp = new Date()

  const serverTime = moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss')

  let serverLocation = { city: 'Unknown', country: 'Unknown' }
  try {
    const response = await axios.get('http://ip-api.com/json')
    if (response.data && response.data.city && response.data.country) {
      serverLocation = {
        city: response.data.city,
        country: response.data.country
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error)
  }

  res.reply(
    { code: 200, message: 'service is up and running!' },
    {
      timestamp: currentTimestamp,
      uptime: uptime,
      startTime: startTime,
      memoryUsage: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external
      },
      cpuUsage: cpuUsage,
      system: {
        platform: os.platform(),
        architecture: os.arch(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
      },
      server: {
        time: serverTime,
        location: serverLocation,
        timezone: 'UTC',
        nodeVersion: process.version,
        serverHost: os.hostname(),
        environment: process.env.NODE_ENV
      }
    }
  )
})

app.use(routes)

app.use('*', notFound)

app.use(errorLogger)

app.use(errorHandler)
