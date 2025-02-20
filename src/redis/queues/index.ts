import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { BASE_PATH_FOR_BULL_BOARD } from '../../constant'
import { code_queue } from './code'

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath(BASE_PATH_FOR_BULL_BOARD)

createBullBoard({
  queues: [new BullMQAdapter(code_queue)],
  serverAdapter
})

export { serverAdapter }
