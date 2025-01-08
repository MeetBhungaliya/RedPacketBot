import storage from 'node-persist'

const initBot = async () => {
  const BOT = global.bot

  if (!BOT) {
    return global.log.error('Bot not initialized')
  }

  global.log.info('Bot initialised successfully')

  const users = await storage.get('users')
  const usersSet = new Set(users || [])

  BOT.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id

    if (usersSet.has(chatId)) {
      BOT.sendMessage(chatId, 'You already there 👋')
    } else {
      usersSet.add(chatId)
      await storage.set('users', Array.from(usersSet))
      BOT.sendMessage(chatId, 'You are in 😍')
    }
  })

  BOT.onText(/\/stop/, async (msg) => {
    const chatId = msg.chat.id

    if (usersSet.has(chatId)) {
      BOT.sendMessage(chatId, 'You already there 👋')
    } else {
      usersSet.delete(chatId)
      await storage.set('users', Array.from(usersSet))
      BOT.sendMessage(chatId, 'You are out 🥹')
    }
  })
}

const sendCode = async (grabCode: string): Promise<void> => {
  const BOT = global.bot

  if (!BOT) {
    global.log.error('Bot not initialized')
    return
  }

  try {
    const users: string[] | undefined = await storage.get('users')
    const codes: string[] | undefined = await storage.get('codes')

    if (!Array.isArray(users) || !Array.isArray(codes)) {
      global.log.error('Invalid users or codes data')
      return
    }

    const usersSet = new Set(users)
    const codesSet = new Set(codes)

    if (codesSet.has(grabCode)) {
      return
    }

    for (const chatId of usersSet) {
      await BOT.sendMessage(chatId, grabCode)
    }

    codesSet.add(grabCode)

    await storage.set('codes', Array.from(codesSet))
  } catch (error) {
    global.log.error(`Error sending code: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export { initBot, sendCode }
