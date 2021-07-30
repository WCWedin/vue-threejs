import { inject, provide, watch, Ref, WatchStopHandle, InjectionKey, onMounted, onUnmounted, shallowRef, ref } from 'vue'

type Store = Readonly<{ [name: string]: Ref<any> }>

type StoreItemFunc = <T>(item: Ref<T>, name: string | null, oldName: string | null) => void

const storeItemKey: InjectionKey<StoreItemFunc> = Symbol('storeItem')

const storeKey: InjectionKey<Ref<Store>> = Symbol('store')

export function useScopeStorage(prop: Ref<string | null>, member: any) {
  const storeItem: Ref<StoreItemFunc | null> = shallowRef(null)
  onMounted(() => {
    storeItem.value = inject(storeItemKey, null)
  })
  onUnmounted(() => {
    storeItem.value = null
  })

  // Keep this scope member's data properly registered with its parent.
  watch([prop, storeItem],
    ([name, storeItem], [oldName, oldStoreItem]) => {
      // It the storeItem function has changed…
      if (oldStoreItem && oldStoreItem !== storeItem) {
        // …remove the item from the old store.
        oldStoreItem(member, oldName ?? null, null)
        // Its old name is also meaningless in the new store.
        oldName = null
      }
      if (storeItem) {
        // Move the item from its old name to its new name, or add the item if oldName is null or undefined.
        storeItem(member, name, oldName ?? null)
      }
    },
    {
      immediate: true
    }
  )

  return {}
}

export type ItemStoredCallback = (ref: Ref<any>, name: string | null, oldName: string | null) => void

export function useScopeProvider(itemStoredCallback?: ItemStoredCallback) {
  const parentStore: Ref<Ref<Store> | null> = shallowRef(null)
  const localStore: Ref<Store> = shallowRef({})
  const store: Ref<Store> = shallowRef({})
  onMounted(() => {
    parentStore.value = inject(storeKey, null)
  })
  onUnmounted(() => {
    parentStore.value = null
  })

  // Watch to see if a new parentStore has been injected.
  let stopStoreWatcher: WatchStopHandle | null = null
  watch(parentStore,
    (parentStore) => {
      // Clear existing watcher.
      if (stopStoreWatcher) stopStoreWatcher()
      stopStoreWatcher = null

      if (parentStore !== null) {
        // Construct a new merged store upon data changes to either of the backing stores.
        stopStoreWatcher = watch([parentStore, localStore],
          ([parentStore, localStore]) => {
            store.value = { ...parentStore, ...localStore }
          },
          { immediate: true }
        )
      }
    },
    { immediate: true }
  )

  // A function for use by scope members to register their items in the store.
  function storeItem<T>(ref: Ref<T>, name: string | null, oldName: string | null): void {
    const newStore = { ...localStore.value }

    if (oldName !== null) {
      delete newStore[oldName]
    }
    if (name !== null) {
      if (name in newStore) {
        // TODO: How *should* scope stores handle name conflicts? At minimum, returning a success value could help.
        // At the other extreme: Keep name conflicts in a queue and return a promise that resolves once the name frees up and the value lands in the store.
        // It's a bit of a mess, actually. What funcionality does the consumer of this function need to make a useful decision?
      } else {
        newStore[name] = ref
      }
    }

    localStore.value = newStore
    if (itemStoredCallback) itemStoredCallback(ref, name, oldName)
  }

  provide(storeKey, store)
  provide(storeItemKey, storeItem)

  return {}
}

export function isInstanceOf<T>(...constructors: [{ new(...args: any[]): T } | null]) {
  return (value: any): value is T => {
    // Test each constructor against the value, with special matching for nulls.
    constructors.forEach(constructor => {
      if (constructor === null) {
        if (value === null) {
          return true
        }
      } else if (value instanceof constructor) {
        return true
      }
    })
    return false
  }
}

export function useScopeConsumer() {
  const store: Ref<Ref<Store> | null> = shallowRef(null)
  onMounted(() => {
    store.value = inject(storeKey, null)
  })
  onUnmounted(() => {
    store.value = null
  })

  function refsType<T>(ref: Ref<any>, predicate: (value: any) => value is T): ref is Ref<T> {
    return predicate(ref.value)
  }

  return {
    /** Gets a references that can retrieve its value from the scope store.
     *  @param prop A property that provides a value of the appropriate type or a string index into the scope store.
     *  @param typePredicate A function that returns true if a candidate store value is of the appropriate type.
     *  @param fallback A readonly default value that will be provided through the returned reference if no other value is available,
     *    for instance when there is no matching index in the scope store.
     *  @returns A reference that updates as both the prop value and the scope store change.
     */
    getItem<T>(prop: Ref<T | string>, typePredicate: (value: any) => value is T): Ref<T | undefined> {
      // Keep this around as a fallback for when a value is requested from the scope store but no such value is present.
      const reference = ref<T>()

      // Watch for changes to either the prop or the store and update the returned reference as necessary.
      let stopStoreWatcher: WatchStopHandle | null = null
      watch([prop, store],
        ([value, store]) => {
          // Clear existing store watcher.
          if (stopStoreWatcher) stopStoreWatcher()
          stopStoreWatcher = null

          if (typePredicate(value)) {
            // If the prop's value is already of the target type, pass it through directly.
            reference.value = value
          } else if (store === null) {
            // If the store hasn't been initialized, use undefined.
            reference.value = undefined
          } else if (typeof value === 'string') {
            // If value is of type string, index into the store;
            // watch for changes to the store and check for a matching item.
            let stopItemWatcher: WatchStopHandle | null = null
            stopStoreWatcher = watch(store,
              (store) => {
                // Clear existing item watcher.
                if (stopItemWatcher) stopItemWatcher()
                stopItemWatcher = null

                // If a matching item exists in the store, watch for changes and update the returned reference.
                const item = store[value]
                if (item && refsType(item, typePredicate)) {
                  stopItemWatcher = watch(item,
                    (item) => {
                      reference.value = item
                    },
                    { immediate: true }
                  )
                } else {
                  // A matching item wasn't found; use undefined.
                  reference.value = undefined
                }
              },
              { immediate: true }
            )
          } else {
            // This should only happen if the caller isn't using the TypeScript bindings or has made an invalid cast.
            reference.value = undefined
          }
        },
        { immediate: true }
      )

      return reference
    }
  }
}
