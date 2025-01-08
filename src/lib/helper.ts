import { Webhook } from './../types/webhook.d'

const pollForWebhookValue = async <T>(key: string, interval: number = 1000): Promise<T | string> => {
  if (!(key in global.webhook)) {
    return `The key "${key}" is not present in webhook`
  }

  while (global.webhook[key as keyof Webhook] === null) {
    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  return global.webhook[key as keyof Webhook] as T
}

const wait = (ms: number): Promise<void> => {
  if (typeof ms !== 'number' || ms < 0 || !Number.isFinite(ms)) {
    return Promise.reject(new Error('The wait time must be a positive number.'))
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const matchCodeRegex = (message: string) => {
  const codeRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8}$/i
  const match = message.match(codeRegex)

  if (!match) return

  return match[0]
}

export { pollForWebhookValue, wait, matchCodeRegex }
