import type { PluginFactory } from 'pocketpages'

export type RealtimeFilter = (clientId: string, client: any) => boolean

const _realtimeSend = (name: string, data: string, filter: RealtimeFilter) => {
  const payload = new SubscriptionMessage({
    name,
    data,
  })

  const clients = $app.subscriptionsBroker().clients()

  const filteredClients = Object.entries(clients).filter(
    ([clientId, client]) =>
      client.hasSubscription(name) && filter(clientId, client)
  )

  filteredClients.forEach(([clientId, client]) => {
    client.send(payload)
  })
}

const realtimePluginFactory: PluginFactory = (config) => {
  const { dbg } = config

  return {
    name: 'sse',
    onExtendContextApi: ({ api }) => {
      const DefaultSseFilter: RealtimeFilter = (
        clientId: string,
        client: any
      ) => {
        return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
      }

      api.realtime = {
        send(
          topic: string,
          message: string,
          filter: RealtimeFilter = DefaultSseFilter
        ): void {
          return _realtimeSend(topic, message, filter)
        },
      }
    },
  }
}

export default realtimePluginFactory
