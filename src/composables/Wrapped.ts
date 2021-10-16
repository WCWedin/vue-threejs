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
 *    setup(props, { slots, expose }) {
 *      const kettle = new Kettle()
 *      expose(composableKettle.use(fromProps(props), kettle))
 *      return () => {
 *        slots.default?.()
 *        return undefined
 *      }
 *    }
 *  })
 */
export interface ComposableWrapper<WrappedObject, ObjectProps, UseResult> {
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
  readonly use: (props: FromProps<ObjectProps>, wrapped: WrappedObject) => UseResult
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

/** Starts a watcher to synchronize a variable with the value of a watch source.
 *  @template T The type of the value of the be synchronized.
 *  @param source A watch source to synchronize from.
 *  @returns The stop handle for the generated watcher.
 */
export type SyncFunction<T> = (source: WatchSource<T>) => WatchStopHandle

export type SyncFunctions<T extends S, S = unknown> = {
  [K in keyof WriteableProps<Subtract<T, S>>]: WriteableProps<Subtract<T, S>>[K] extends never
  ? never
  : SyncFunction<WriteableProps<Subtract<T, S>>[K]>
}

export type SyncByCopyFunctions<T extends S, S = unknown> = {
  [K in keyof ReadonlyProps<Subtract<T, S>>]: ReadonlyProps<Subtract<T, S>>[K] extends never
  ? never
  : SyncFunction<ReadonlyProps<Subtract<T, S>>[K]>
}

/** For each property in sourceObject, creates a function that takes a WatchSource,
 *  starts a watcher to synchronize that property's value with the WatchSource value,
 *  and returns the stop handle to that watcher.
 *  @param sourceObject The object for which to generate synchronization functions.
 *  @returns A set of synchronization functions for each of `sourceObject`'s properties.
 */
export function getSyncFunctions<T extends S, S = unknown>(sourceObject: T): SyncFunctions<T, S> {
  return Object.fromEntries(Object.keys(sourceObject).map((key): [string, SyncFunction<unknown>] => {
    return [key, (source) => {
      return watch(source,
        (value) => {
          sourceObject[key as keyof T] = value as T[keyof T]
        },
        { immediate: true }
      )
    }]
  })) as SyncFunctions<T, S>
}

type Copyable<T> = T & {
  copy: (newValue: T) => void
}

/** A type guard that determines whether a type has a given property, optionally matching a provided type.
 *  @template T The target type to investigate.
 *  @template P A string, number, or symbol literal representing the property to check for.
 *  @template V A type the property value must match via `instanceof`.
 *  @param value The target value to investigate.
 *  @param property A string, number, or symbol literal representing the property to check for.
 *  @param type A constructor for a type that the property value must match via `instanceof`.
 */
export function hasProperty<T, P extends string | number | symbol, V = unknown>(value: T, property: P, type?: Class<V>): value is T & Record<P, V> {
  return property in value
    && (type === undefined || (<Record<string | number | symbol, unknown>>value)[property] instanceof type)
}

function isCopyable<T>(value: unknown): value is Copyable<T> {
  return value != null
    && hasProperty(value, 'copy', Function)
    && value.copy.length === 1
}

/** Creates a function for each property in sourceObject that takes a Ref, starts a watcher to update the property, and returns the stop handler.
 *  @param sourceObject The object for which to generate synchronization functions.
 */
export function getSyncByCopyFunctions<T extends S, S = unknown>(sourceObject: T): SyncByCopyFunctions<T, S> {
  return Object.fromEntries(Object.keys(sourceObject).map((key): [string, SyncFunction<unknown>] => {
    return [key, (source) => {
      return watch(source,
        (value) => {
          const target = sourceObject[key as keyof T]
          if (isCopyable(target)) {
            target.copy(value)
          }
        },
        { immediate: true, deep: true }
      )
    }]
  })) as SyncByCopyFunctions<T, S>
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

export function isRefTo<T>(value: unknown, type: Class<T>): value is Ref<T> {
  return value != null && hasProperty(value, 'value', type)
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

/** Flattens an intersection type `T` into its equivalent simple type.
 *  For example, `{ prop1: any } & { prop2: unknown } & { }` would be flattened to `{ prop1: any, prop2: unknown }`.
 *  Source: https://github.com/DetachHead/ts-helpers
 */
type Flatten<T> = T extends infer R & {}
  ? {
    [P in keyof R]: R[P]
  }
  : never

/** A type that aliases `true` if the two comparison types are property-wise equal, or otherwise aliases `false`.
 *  Source: https://github.com/DetachHead/ts-helpers
 */
type Equals<A, B> =
  (<T>() => T extends Flatten<A> ? 1 : 2) extends
  (<T>() => T extends Flatten<B> ? 1 : 2)
  ? true
  : false

/** A type that aliases one of two candidate types, determined by whether the two comparison types are property-wise equal.
 *  @template A The first of the types to compare for equality.
 *  @template B The second of the types to compare for equality.
 *  @template EqualsType The type to use when `A` and `B` are equal.
 *  @template NotEqualsType The type to use when `A` and `B` are not equal.
 */
type IfEquals<A, B, EqualsType, NotEqualsType> = Equals<A, B> extends true ? EqualsType : NotEqualsType

type ExcludePropsOfType<T, V> = { [K in keyof T as T[K] extends V ? never : K]: T[K] }
type ExcludeNeverProps<T> = ExcludePropsOfType<T, never>
type ExcludeFunctionProps<T> = ExcludePropsOfType<T, Function>

/** A type with a single property with name `P`, type `T[P]`, matching writablity modifiers. */
type SingleProp<T, P extends keyof T> = { [Q in P]: T[P] }
/** A type with a single, mutable property with name `P` and type `T[P]`. */
type MutableSingleProp<T, P extends keyof T> = { -readonly [Q in P]: T[P] }

type ExcludeReadonlyProps<T> = {
  [P in keyof T]-?: T[IfEquals<SingleProp<T, P>, MutableSingleProp<T, P>, P, never>]
}
type ExcludeWritableProps<T> = {
  [P in keyof T]-?: T[IfEquals<SingleProp<T, P>, MutableSingleProp<T, P>, never, P>]
}

type WriteableProps<T> = ExcludeNeverProps<ExcludeReadonlyProps<ExcludeFunctionProps<T>>>
type ReadonlyProps<T> = ExcludeNeverProps<ExcludeWritableProps<ExcludeFunctionProps<T>>>

/** A type containing a constructor that returns a new object of type `T`. */
export type Class<T> = { new(...args: any[]): T & {} }

/** A type with only those properties of `T` that aren't also of `S`. */
export type Subtract<T, S> = Omit<T, keyof S>
