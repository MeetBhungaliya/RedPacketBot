import { TelegramClient } from 'telegram'
import { NewMessage, NewMessageEvent } from 'telegram/events'
import { StringSession } from 'telegram/sessions'
import { matchCodeRegex, pollForWebhookValue } from '../lib/helper'
import queue from '../lib/queue'
import { addJob } from '../redis/queues/code'
// import { sendCode } from '../telegram/initBot'

const connect = async () => {
  const stringSession = new StringSession('')
  const client = new TelegramClient(stringSession, +process.env.API_ID, process.env.API_HASH, {
    reconnectRetries: 1
  })

  try {
    await client.start({
      phoneNumber: async (): Promise<string> => {
        return await pollForWebhookValue<string>('phone')
      },
      phoneCode: async (): Promise<string> => {
        return await pollForWebhookValue<string>('code')
      },
      password: async (): Promise<string> => {
        return await pollForWebhookValue<string>('password')
      },
      onError: (err: Error) => {
        global.webhook.error = err
        throw err
      }
    })

    client.addEventHandler(messageHandler, new NewMessage({}))
  } catch (error) {
    global.log.error(`Authentication error ${error}`)
  }
}

async function messageHandler(event: NewMessageEvent) {
  if (!event.message.message) return

  const grabCode = matchCodeRegex(event.message.message)

  if (!grabCode) return

  queue.enqueue(grabCode)
}

queue.subscribe(async (grabCode) => {
  try {
    // await sendCode(grabCode)
    addJob(grabCode)
    queue.dequeue()
  } catch (error) {
    console.log(error)
  }
})

export { connect }
