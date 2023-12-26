import { PiniaPluginContext, Store } from 'pinia'
import { get } from 'lodash-es'
import serializeJavascript from 'serialize-javascript'

interface Strategy {
  key?: string
  storage?: Storage
  paths?: string[]
  serialize?: boolean
}
interface PersistOptions {
  enabled: boolean
  strategies?: Strategy[]
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}
function deserialize(content: string, strategy: Strategy) {
  if (strategy.serialize) {
    // eslint-disable-next-line no-eval
    return eval(`(${content})`)
  }
  return JSON.parse(content)
}

function serialize(obj: unknown, strategy: Strategy) {
  if (strategy.serialize)
    return serializeJavascript(obj)

  return JSON.stringify(obj)
}

export function updateStorage(strategy: Strategy, store: Store) {
  const storage = strategy.storage || sessionStorage
  const storeKey = strategy.key || store.$id
  if (strategy.paths) {
    const partialObj: Record<PropertyKey, unknown> = {}
    strategy.paths.forEach((path) => {
      partialObj[path] = get(store.$state, path)
    })
    storage.setItem(storeKey, serialize(partialObj, strategy))
  }
  else {
    storage.setItem(storeKey, serialize(store.$state, strategy))
  }
}

/**
 * 持久化插件
 * 支持序列化一些简单函数
 */
function PiniaPluginPersist({ options, store }: PiniaPluginContext) {
  // console.log('PiniaPluginPersist', { options, store })
  if (options.persist?.enabled) {
    const defaultStrategy: Strategy[] = [
      {
        key: store.$id,
        storage: sessionStorage,
      },
    ]

    const strategies = options.persist?.strategies?.length
      ? options.persist.strategies
      : defaultStrategy
    console.group('PiniaPluginPersist init')
    strategies.forEach((strategy) => {
      const storage = strategy.storage || sessionStorage
      const storageKey = strategy.key || store.$id
      const storageResult = storage.getItem(storageKey)

      if (storageResult) {
        console.log('reuse', strategy, deserialize(storageResult, strategy))
        store.$patch(deserialize(storageResult, strategy))
        updateStorage(strategy, store)
      }
    })
    console.groupEnd()
    store.$subscribe((mutation, state) => {
      console.log('$subscribe', mutation, state)
      strategies.forEach((strategy) => {
        updateStorage(strategy, store)
      })
    })
  }
}

export default PiniaPluginPersist
