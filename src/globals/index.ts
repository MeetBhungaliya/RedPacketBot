import log from './log'
import messages from './messages'
import TelegramBot from 'node-telegram-bot-api'

const BOT = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

global.log = log
global.messages = messages
global.bot = BOT
global.webhook = { phone: null, code: null, password: null, error: null }
