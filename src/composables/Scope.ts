import { inject, provide, watch, Ref, WatchStopHandle, InjectionKey, onMounted, onUnmounted, shallowRef, ref } from 'vue'

// TODO: Move these utility functions.
function refsType<T>(ref: Ref<unknown>, predicate: (value: unknown) => value is T): ref is Ref<T> {
  return predicate(ref.value)
}

export function isInstanceOf<T>(...constructors: [{ new(...args: any[]): T } | null]) {
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

export interface Store {
  set(item: Ref<unknown>, name: string): void
  remove(item: Ref<unknown>): void
  get(name: string): Ref<unknown> | undefined
}

export class LocalStore implements Store {
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

class MergedStore implements Store {
  parent: Store
  local: LocalStore

  constructor(parent: Store, local: LocalStore) {
    this.parent = parent
    this.local = local
  }

  set(item: Ref<unknown>, name: string) {
    this.local.set(item, name)
  }

  remove(item: Ref<unknown>) {
    this.local.remove(item)
  }

  get(name: string) {
    return this.local.get(name) ?? this.parent.get(name)
  }
}

const storeKey: InjectionKey<Ref<Store>> = Symbol('store')

export function useScopeStorage(name: Ref<string | null>, item: Ref<unknown>) {
  const storeRef: Ref<Ref<Store> | null> = shallowRef(null)
  onMounted(() => {
    storeRef.value = inject(storeKey, null)
  })
  onUnmounted(() => {
    storeRef.value = null
  })

  let stopNameWatcher: WatchStopHandle | null = null
  watch(storeRef,
    (store, oldStore) => {
      oldStore?.value.remove(item)
      if (stopNameWatcher !== null) {
        stopNameWatcher()
      }
      stopNameWatcher = watch(name,
        (name) => {
          if (name !== null) {
            store?.value.set(item, name)
          }
        },
        { immediate: true }
      )
    },
    { immediate: true }
  )

  return { storeRef }
}

/** Composes scope store provider functionality into a component.
 *  @param
 */
export function useScopeProvider() {
  const parentStore: Ref<Ref<Store> | null> = shallowRef(null)
  const localStore: LocalStore = new LocalStore()
  const store: Ref<Store> = shallowRef(localStore)
  onMounted(() => {
    parentStore.value = inject(storeKey, null)
  })
  onUnmounted(() => {
    parentStore.value = null
  })

  let stopInnerWatcher: WatchStopHandle | null = null
  watch(parentStore,
    (parentStore) => {
      if (stopInnerWatcher !== null) {
        stopInnerWatcher()
        stopInnerWatcher = null
      }

      if (parentStore === null) {
        store.value = localStore
      } else {
        stopInnerWatcher = watch(parentStore,
          (parentStore) => {
            store.value = new MergedStore(parentStore, localStore)
          },
          { immediate: true }
        )
      }
    },
    { immediate: true }
  )

  provide(storeKey, store)

  const storeRef: Ref<Ref<Store> | null> = shallowRef(null)
  storeRef.value = store
  return {
    /** Gets a reference that can retrieve its value from the scope store.
    *  @param prop A property that provides a value of the appropriate type or a string index into the scope store.
    *  @param typePredicate A function that returns true if a candidate store value is of the appropriate type.
    *  @returns A reference that updates as both the prop value and the scope store change.
    */
    getItem<T>(prop: Ref<T | string>, typePredicate: (value: unknown) => value is T): Ref<T | undefined> {
      return getItem(storeRef, prop, typePredicate)
    },
    storeRef
  }
}

export function getItem<T>(storeRef: Ref<Ref<Store> | null>, prop: Ref<T | string>, typePredicate: (value: unknown) => value is T): Ref<T | undefined> {
  const reference = ref<T>()

  // Watch for changes to either the prop or the store and update the returned reference as necessary.
  let stopStoreWatcher: WatchStopHandle | null = null
  let stopItemWatcher: WatchStopHandle | null = null

  watch([prop, storeRef],
    ([value, storeRef]) => {
      // Clear existing watchers.
      if (stopStoreWatcher) stopStoreWatcher()
      stopStoreWatcher = null
      if (stopItemWatcher) stopItemWatcher()
      stopItemWatcher = null

      if (typePredicate(value)) {
        // If the prop's value is already of the target type, pass it through directly.
        reference.value = value
      } else if (storeRef === null) {
        // If the store hasn't been initialized, use undefined.
        reference.value = undefined
      } else if (typeof value === 'string') {
        const name = value
        // If value is of type string, index into the store;
        // watch for changes to the store and check for a matching item.
        stopStoreWatcher = watch(storeRef,
          (store) => {
            // If a matching item exists in the store, watch for changes and update the returned reference.
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
          },
          {
            immediate: true
          }
        )
      } else {
        // This should only happen if the caller isn't using the TypeScript bindings or has made an invalid cast.
        reference.value = undefined
      }
    },
    {
      immediate: true
    }
  )

  return reference
}
