import { inject, provide, watch, Ref, WatchStopHandle, InjectionKey, onMounted, onUnmounted, ref, shallowRef } from 'vue'
 
// TODO: Properly dispose of watchers in Scope.ts.


// TODO: Move these utility functions.
function refsType<T>(ref: Ref<unknown>, predicate: (value: unknown) => value is T): ref is Ref<T> {
  return predicate(ref.value)
}

export function isInstanceOf<T>(...constructors: ({ new(...args: any[]): T } | null)[]) {
  return (value: unknown): value is T => {
    // Test each constructor against the value, with special matching for nulls.
    for (const constructor of constructors) {
      if (constructor === null) {
        if (value === null) {
          return true
        }
      } else if (value instanceof constructor) {
        return true
      }
    }
    return false
  }
}

class Store {
  protected values = new Map<string, Ref<unknown>>()
  protected names = new Map<Ref<unknown>, string>()

  // TODO: return QueueObserver and handle collisions better
  set(item: Ref<unknown>, name: string) {
    this.remove(item)
    this.names.set(item, name)
    const oldItem = this.get(name)
    if (oldItem !== undefined) this.remove(oldItem)
    this.values.set(name, item)
  }

  remove(item: Ref<unknown>) {
    const name = this.names.get(item)
    if (name !== undefined) {
      this.names.delete(item)
      this.values.delete(name)
    }
  }

  get(name: string) {
    return this.values.get(name)
  }
}

type storeItemDef = (name: Ref<string | null> | string, item: Ref<unknown>) => void
const storeItemKey: InjectionKey<storeItemDef> = Symbol('storeItem')

type getItemDef = <T = unknown>(prop: Ref<T | string> | string, typePredicate: (value: unknown) => value is T) => Ref<T | undefined>
const getItemKey: InjectionKey<getItemDef> = Symbol('getItem')

function isUnknown<T>(value: unknown): value is T { return true }

export function useScopeProvider(exposes?: Ref<string[]>, accepts?: Ref<string[]>) {
  const store = new Store()
  const { getItem: outerGetItem, storeItem: outerStoreItem } = useScopeConsumer()

  // TODO: return status and termination object
  function storeItem(name: Ref<string | null> | string, item: Ref<unknown>) {
    if (typeof name === 'string') name = shallowRef(name)
    watch([store, name],
      ([parent, name], [oldParent]) => {
        if (parent !== oldParent) oldParent?.remove(item)
        if (name) parent?.set(item, name)
      },
      { immediate: true }
    )
  }

  // TODO: return status and termination object
  function getItem<T = unknown>(
    prop: Ref<T | string> | string,
    typePredicate: (value: unknown) => value is T = isUnknown
  ): Ref<T | undefined> {
    if (typeof prop === 'string') prop = shallowRef(prop)

    const reference = ref<T>()
    let stopItemWatcher: WatchStopHandle | null = null


    watch(prop,
      (value) => {
        if (stopItemWatcher) stopItemWatcher()
        stopItemWatcher = null

        if (typePredicate(value)) {
          // If the prop's value is already of the target type, pass it through directly.
          reference.value = value
        } else if (typeof value === 'string') {
          // If value is of type string, index into the store;
          // watch for changes to the store and check for a matching item.
          const name = value
          // If a matching item exists in the store, watch for changes and update the returned reference.
          // TODO: Watch the store instead, and find a cleaner way to keep `reference` in sync with `item`.
          const item = store.get(name)
          if (item && refsType(item, typePredicate)) {
            stopItemWatcher = watch(item,
              (item) => {
                reference.value = item
              },
              {
                immediate: true
              }
            )
          } else {
            // A matching item wasn't found; use undefined.
            reference.value = undefined
          }
        } else {
          // This should only happen if the caller isn't using the TypeScript bindings or has made an invalid cast.
          reference.value = undefined
        }
      },
      { immediate: true }
    )

    return reference
  }

  if (exposes) {
    watch(exposes,
      (exposes) => {
        for (const exposedName in exposes) {
          const item = getItem(exposedName)
          outerStoreItem(exposedName, item)
        }
      },
      { immediate: true }
    )
  }

  if (accepts) {
    watch(accepts,
      (accepts) => {
        for (const acceptedName in accepts) {
          const item = outerGetItem(acceptedName)
          if (item) storeItem(acceptedName, item)
        }
      },
      { immediate: true }
    )
  }

  provide(storeItemKey, storeItem)
  provide(getItemKey, getItem)
}

export function useScopeConsumer() {
  let getItem: getItemDef | null = null
  let storeItem: storeItemDef | null = null
  onMounted(() => {
    getItem = inject(getItemKey, null)
    storeItem = inject(storeItemKey, null)
  })
  onUnmounted(() => {
    getItem = null
    storeItem = null
  })

  return {
    getItem<T = unknown>(
      prop: Ref<T | string> | string,
      typePredicate: (value: unknown) => value is T = isUnknown): Ref<T | undefined> {
      const reference: Ref<T | undefined> = shallowRef(undefined)
      watch(() => getItem,
        (getItem) => {
          if (getItem) {
            watch(getItem(prop, typePredicate),
              (item) => {
                reference. value = item
              },
              { immediate: true }
            )
          }
        },
        { immediate: true }
      )
      return reference
    },
    storeItem(name: Ref<string | null> | string, item: Ref<unknown>) {
      return storeItem?.(name, item)
    }
  }
}
