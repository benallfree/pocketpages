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

  const deferredRealtime: {
    topic: string
    filter: RealtimeFilter
  } = {
    topic: '',
    filter: () => false, //Noop
  }

  return {
    name: 'sse',
    onExtendContextApi: ({ api }) => {
      const DefaultSseFilter: RealtimeFilter = (
        clientId: string,
        client: any
      ) => {
        return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
      }

      function send(
        topic: string,
        message: string,
        filter?: RealtimeFilter
      ): void
      function send(topic: string, filter?: RealtimeFilter): void
      function send(
        topic: string,
        messageOrFilter: string | RealtimeFilter = DefaultSseFilter,
        filter: RealtimeFilter = DefaultSseFilter
      ): void {
        const isDeferred = typeof messageOrFilter === 'function'
        if (isDeferred) {
          deferredRealtime.topic = topic
          deferredRealtime.filter = messageOrFilter as RealtimeFilter
          dbg('Deferred SSE', { deferredSse: deferredRealtime })
          return
        }
        return _realtimeSend(topic, messageOrFilter as string, filter)
      }

      api.realtime = {
        send,
      }
    },
    onResponse: ({ api, content }) => {
      const { stringify, response } = api
      dbg('Deferred realtime send', { deferredRealtime })

      if (!deferredRealtime.topic) return false

      _realtimeSend(
        deferredRealtime.topic,
        stringify(content),
        deferredRealtime.filter
      )
      return true
    },
  }
}

export default realtimePluginFactory
