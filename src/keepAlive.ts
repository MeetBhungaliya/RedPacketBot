import axios from 'axios'
import { KEEP_ALIVE_INTERVAL_TIME } from './constant'

const keepAlive = async () => {
  try {
    await axios.get('https://redpacketbot.onrender.com/webhook')
    global.log.blue('I AM ALIVE')
  } catch (error) {
    global.log.red('I AM DEAD', error)
  }
}

setInterval(() => {
  keepAlive()
}, KEEP_ALIVE_INTERVAL_TIME)
