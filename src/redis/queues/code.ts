import { Queue } from 'bullmq'
import redis from '../connection'

const QUEUE_NAME = 'RED_PACKET_CODE'

export const code_queue = new Queue(QUEUE_NAME, { connection: redis })
