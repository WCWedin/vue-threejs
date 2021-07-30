import {
  Prop, ObjectEmitsOptions as Emits, ComponentInternalInstance as Instance,
  Ref, toRefs, ToRefs, WatchSource, WatchStopHandle, watch, shallowRef
} from 'vue'

export {
  /** An alias to `vue.ObjectEmitsOptions`, specifing the emits options of a component.
   *  @see vue.ObjectEmitsOptions
   */
  ObjectEmitsOptions as Emits
} from 'vue'

/** A props configuration corresponding to the properties of the provided type. */
export type Props<P> = {
  [K in keyof P]: Prop<P[K]>
}

/** A specification for how to store, retrieve, and interact with an object wrapped by a Vue composable.
 *  @example
 *  declare class Kettle {
 *    temperature: number
 *    function onBoil(callback: () => void): void
 *    function toggleHeat(): void
 *  }
 *
 *  interface KettleProps {
 *    temperature: number
 *  }
 *
 *  const kettleProps: Props<KettleProps> = {
 *    temperature: {
 *      type: Number,
 *      required: true
 *    }
 *  }
 *
 *  const kettleEmits = {
 *    boil: null
 *  }
 *
 *  function useKettle(props: FromProps<KettleProps>, kettle: Kettle) {
 *    const instance = getCurrentInstance()!
 *    kettle.onBoil(() => instance.emit('boil'))
 *    const sync = getSyncFunctions(kettle)
 *    sync.temperature(props.temperature)
 *
 *    return {
 *      toggleHeat,
 *      kettle
 *    }
 *  }
 *
 *  const composableKettle: ComposableWrapper<Kettle, KettleProps> = {
 *    props: kettleProps,
 *    emits: kettleEmits,
 *    use: useKettle
 *  }
 *
 *  const kettleComponent = defineComponent({
 *    props: { ...composableKettle.props },
 *    emits: { ...composableKettle.emits },
 *    setup(props) {
 *      const kettle = new Kettle()
 *      return { ...composableKettle.use(fromProps(props), kettle) }
 *    }
 *  })
 */
export interface ComposableWrapper<WrappedObject, ObjectProps> {
  /** An object specifying the props configuration this composable's {@link use} method requires.
   *  This should generally be spread into the props configuration of the implementing component,
   *  though it may also be destructured to use data sources other than props.
   */
  readonly props: Readonly<Props<ObjectProps>>

  /** An object specifying the configuration for the events this composable will emit.
   *  This should generally be spread into the emits configuration of the implementing component.
   */
  readonly emits: Readonly<Emits>

  /** Composes a wrapped object's functionality into a Vue component. */
  readonly use: (props: FromProps<ObjectProps>, wrapped: WrappedObject) => {}
}

/** An alias to `vue.ToRefs`, specifing the a set of Refs that map to target type `T`. */
export type FromProps<T> = ToRefs<T>

/** Takes a set of property values derived from {@link Props}`<T>` and returns a set of references matching `T`'s properties.
 *  This is particularly useful for removing `undefined` from prop value types that are guaranteed to have a value.
 *  @param props A set of properties passed into ` {@link vue.defineComponent}`'s `setup` function,
 *  provided the component's props option fulfills {@link Props}`<T>`.
 *  @returns A set of reactive references conforming to `T` and containing the properties provided in `props`.
 */
export function fromProps<T extends object>(props: Partial<T>): FromProps<T> {
  return toRefs<T>(<T>props)
}

/** A set of functions that will each syncroize a property of a backing `T` (optionally without those of some subset type `S`) to the provided `Ref`. */
export type SyncFunctions<T extends S, S = {}> = {
  [K in keyof WritableKeys<Subtract<RemoveFuncs<T>, S>>]: WritableKeys<Subtract<RemoveFuncs<T>, S>>[K] extends never
  ? never
  : (source: WatchSource<T[K]>) => WatchStopHandle
}

export type SyncByCopyFunctions<T extends S, S = {}> = {
  [K in keyof ReadonlyKeys<Subtract<RemoveFuncs<T>, S>>]: ReadonlyKeys<Subtract<RemoveFuncs<T>, S>>[K] extends never
  ? never
  : (source: WatchSource<T[K]>) => WatchStopHandle
}

/** Creates a function for each property in sourceObject that takes a Ref, starts a watcher to update the property, and returns the stop handler.
 *  @param sourceObject The object for which to generate synchronization functions.
 */
export function getSyncFunctions<T extends S, S = {}>(sourceObject: T): SyncFunctions<T, S> {
  return <SyncFunctions<T, S>><unknown>Object.keys(sourceObject)
    .map(key => (source: WatchSource) => {
      return watch(source,
        (value) => {
          sourceObject[key as keyof T] = value
        },
        { immediate: true }
      )
    })
}

type Copyable<T> = T & {
  copy: (newValue: T) => void
}

function isCopyable<T>(value: any): value is Copyable<T> {
  return value && value.copy && typeof value.copy === 'function' && value.copy.length === 1
}

export function getSyncByCopyFunctions<T extends S, S = {}>(sourceObject: T): SyncByCopyFunctions<T, S> {
  return <SyncFunctions<T, S>><unknown>Object.keys(sourceObject)
    .map(key => (source: WatchSource) => {
      return watch(source,
        (value) => {
          const target = sourceObject[key as keyof T]
          if (isCopyable(target)) {
            target.copy(value)
          }
        },
        { immediate: true, deep: true }
      )
    })
}

export function mapRef<Source, Result>(source: Ref<Source>, transform: (source: Source) => Result): Ref<Result> {
  const result = shallowRef(transform(source.value))
  watch(source,
    (source) => {
      result.value = transform(source)
    },
    { immediate: true }
  )
  return result
}

export function mapValueOf<R, T extends { valueOf(): R }>(source: Ref<T>) {
  return mapRef(source, (value) => value.valueOf())
}

/** Tests the prop `propName` in `component` against the given `type` and returns either the value of the prop if the type matches or otherwise returns `undefined`.
 *  @param type A constructor to compare the value against using `instanceof`.
 *  @param propName The name of the prop to attempt to retrieve.
*/
export function getInstanceOf<T>(type: Class<T>, propName: string): (component: Instance | null,) => T | undefined {
  return (component) => {
    const prop = component?.props[propName]
    return prop instanceof type ? prop : undefined
  }
}

export function isRefTo<T>(prop: any, type: Class<T>): prop is Ref<T> {
  return prop && prop.value && prop.value instanceof type
}

/** Tests the prop `propName` in `component` for a `Ref` to the given `type` and returns either the value of the prop if the type matches or otherwise returns `undefined`.
 *  @param type A constructor to compare the `Ref`'s `value` against using `instanceof`.
 *  @param propName The name of the prop to attempt to retrieve.
*/
export function getRefTo<T>(type: Class<T>, propName: string): (component: Instance | null,) => Ref<T> | undefined {
  return (component) => {
    const prop = component?.props[propName]
    return isRefTo(prop, type) ? prop : undefined
  }
}

// TODO: These basic types should have their own home.

type RemoveFuncs<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K]
}

// TODO: This is an incantation I found on the internet that I barely understand.
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B

export type WritableKeys<T> = {
  [P in keyof T]-?: T[IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>]
}

export type ReadonlyKeys<T> = {
  [P in keyof T]-?: T[IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>]
}

/** A type containing a constructor that returns a new object of type `T`. */
export type Class<T> = { new(...args: any[]): T & {} }

/** A type with only those properties of `T` that aren't also of `S`. */
export type Subtract<T, S> = Omit<T, keyof S>
