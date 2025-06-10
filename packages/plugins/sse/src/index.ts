import type { PluginFactory } from 'pocketpages'

export type SseFilter = (clientId: string, client: any) => boolean

const _sseSend = (name: string, data: string, filter: SseFilter) => {
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

const ssePluginFactory: PluginFactory = (config) => {
  const { dbg } = config

  const deferredSse: {
    topic: string
    filter: SseFilter
  } = {
    topic: '',
    filter: () => false, //Noop
  }

  return {
    name: 'sse',
    onExtendContextApi: ({ api }) => {
      const DefaultSseFilter: SseFilter = (clientId: string, client: any) => {
        return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
      }

      // Function overloads for sseSend
      function sseSend(topic: string, message: string, filter?: SseFilter): void
      function sseSend(topic: string, filter?: SseFilter): void
      function sseSend(
        topic: string,
        messageOrFilter: string | SseFilter = DefaultSseFilter,
        filter: SseFilter = DefaultSseFilter
      ): void {
        const isDeferred = typeof messageOrFilter === 'function'
        if (isDeferred) {
          deferredSse.topic = topic
          deferredSse.filter = messageOrFilter as SseFilter
          dbg('Deferred SSE', { deferredSse })
          return
        }
        return _sseSend(topic, messageOrFilter as string, filter)
      }

      api.sseSend = sseSend
    },
    onResponse: ({ api, content }) => {
      const { stringify, response } = api
      dbg('Deferred SSE', { deferredSse })

      if (!deferredSse.topic) return false

      _sseSend(deferredSse.topic, stringify(content), deferredSse.filter)
      response.json(200, { sse: 'ok' })
      return true
    },
  }
}

export default ssePluginFactory
