export interface Webhook {
  phone: null | string
  code: null | string
  password: null | string
  error: null | Error
}

declare global {
  interface Webhook {}
}

export {}
