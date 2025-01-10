import storage from 'node-persist'

const initBot = async () => {
  const BOT = global.bot

  if (!BOT) return global.log.error('Bot not initialized')

  global.log.info('Bot initialised successfully')

  const users = await storage.get('users')
  const usersSet = new Set(users || [])

  BOT.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id

    if (usersSet.has(chatId)) return BOT.sendMessage(chatId, 'You already there 👋')
    else {
      usersSet.add(chatId)
      await storage.set('users', Array.from(usersSet))
      return BOT.sendMessage(chatId, 'You are in 😍')
    }
  })

  BOT.onText(/\/stop/, async (msg) => {
    const chatId = msg.chat.id

    if (usersSet.has(chatId)) {
      usersSet.delete(chatId)
      await storage.set('users', Array.from(usersSet))
      return BOT.sendMessage(chatId, 'You are out 🥹')
    } else return BOT.sendMessage(chatId, 'You already out 🥲')
  })
}

const sendCode = async (grabCode: string): Promise<void> => {
  const BOT = global.bot

  if (!BOT) return global.log.error('Bot not initialized')

  try {
    const users: string[] | undefined = await storage.get('users')
    const codes: string[] | undefined = await storage.get('codes')

    if (!Array.isArray(users)) return global.log.error('No users')

    const usersSet = new Set(users)
    const codesSet = new Set(codes)

    if (codesSet.has(grabCode)) return

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
