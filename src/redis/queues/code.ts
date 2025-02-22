import { Queue } from 'bullmq'
import redis from '../connection'
import storage from 'node-persist'

const QUEUE_NAME = 'RED_PACKET_CODE'

export const code_queue = new Queue(QUEUE_NAME, { connection: redis })

const addJob = async (grabCode: string) => {
  try {
    const codes: string[] | undefined = await storage.get('codes')

    const codesSet = new Set(codes)

    if (codesSet.has(grabCode)) return

    codesSet.add(grabCode)
    code_queue.add('code', grabCode)

    await storage.set('codes', Array.from(codesSet))
  } catch (error) {
    global.log.error(`Error sending code: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export { addJob }
