import axios from 'axios'
import { KEEP_ALIVE_INTERVAL_TIME } from './constant'

const keepAlive = async () => {
  try {
    const allRes = await Promise.all([
      axios.get('https://redpacketbot-eew4.onrender.com/api/status'),
      axios.get('https://redpacket-claimer-fxc6.onrender.com/api/status')
    ])

    const check = allRes.every((res) => res.data.messages === 'OK')

    if (check) {
      global.log.blue('I AM ALIVE')
    } else {
      global.log.red('SOMEONE IS DEAD')
    }

    global.log.blue('I AM ALIVE')
  } catch (error) {
    global.log.red('I AM DEAD', error)
  }
}

setInterval(() => {
  keepAlive()
}, KEEP_ALIVE_INTERVAL_TIME)
