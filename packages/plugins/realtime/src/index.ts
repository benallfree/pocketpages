import type { PluginFactory } from 'pocketpages'

export type ClientId = string

// https://pocketbase.io/jsvm/interfaces/subscriptions.Client.html
export type Client = {
  hasSubscription: (topic: string) => boolean
  send: (payload: SubscriptionMessage) => void
  id: () => ClientId
}

export type RealtimeOptions = {
  filter?: RealtimeFilter
}

export type RealtimeFilter = (
  clientId: ClientId,
  client: Client,
  topic: string,
  message: string
) => boolean

const DefaultSseFilter: RealtimeFilter = (
  clientId: ClientId,
  client: Client,
  topic: string,
  message: string
) => {
  return client.hasSubscription(topic)
}

const realtimePluginFactory: PluginFactory = (config) => {
  const { dbg } = config

  return {
    name: 'sse',
    onExtendContextApi: ({ api }) => {
      api.realtime = {
        send(topic: string, message: string, options?: RealtimeOptions): void {
          const payload = new SubscriptionMessage({
            name: topic,
            data: message,
          })

          const clients = $app.subscriptionsBroker().clients() as Record<
            ClientId,
            Client
          >

          const filter = options?.filter ?? DefaultSseFilter

          for (const clientId in clients) {
            const client = clients[clientId]!
            if (filter(clientId, client, topic, message)) {
              client.send(payload)
            }
          }
        },
      }
    },
  }
}

export default realtimePluginFactory
