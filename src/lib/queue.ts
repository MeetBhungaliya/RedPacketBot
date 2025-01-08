class Queue<T> {
  private set: Set<T>
  private order: T[]
  private subscribers: Array<(_: T) => void>

  constructor() {
    this.set = new Set<T>()
    this.order = []
    this.subscribers = []
  }

  enqueue(item: T): void {
    if (!this.set.has(item)) {
      this.set.add(item)
      this.order.push(item)
      this.notifySubscribers(item)
    }
  }

  dequeue(): T | undefined {
    if (this.order.length === 0) {
      return undefined
    }
    const item = this.order.shift()!
    this.set.delete(item)
    return item
  }

  peek(): T | undefined {
    return this.order[0]
  }

  isEmpty(): boolean {
    return this.order.length === 0
  }

  size(): number {
    return this.order.length
  }

  subscribe(callback: (_: T) => void): void {
    this.subscribers.push(callback)
  }

  private notifySubscribers(item: T): void {
    this.subscribers.forEach((subscriber) => subscriber(item))
  }
}

export default new Queue<string>()
