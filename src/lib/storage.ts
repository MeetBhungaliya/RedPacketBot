import storage from 'node-persist'
import path from 'path'

const initStorage = async () => {
  try {
    await storage.init({
      dir: path.join(process.cwd(), 'public', 'cache'),
      stringify: JSON.stringify,
      parse: JSON.parse,
      logging: false,
      writeQueue: true
    })

    global.log.info('Storage initialized successfully')
  } catch (error) {
    global.log.error(`Error while initializing storage ${error}`)
  }
}

export default initStorage
