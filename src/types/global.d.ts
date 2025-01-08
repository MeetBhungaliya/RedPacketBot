import LogFunction from 'globals/log'
import Messages from 'globals/messages'
import type { Webhook } from './webhook'
import TelegramBot from 'node-telegram-bot-api'

declare global {
  var log: typeof LogFunction
  var messages: typeof Messages

  var bot: TelegramBot | null
  var webhook: Webhook
}

export {}
