import {
  Prop, toRefs, ToRefs
} from 'vue'

/** A props configuration corresponding to the properties of the provided type. */
export type Props<P> = {
  [K in keyof P]: Prop<P[K]>
}

/** A specification for how to store, retrieve, and interact with an object wrapped by a Vue composable. */
export interface ComposableWrapper<WrappedObject, ObjectProps, UseResult> {
  /** An object specifying the props configuration this composable's {@link use} method requires.
   *  This should generally be spread into the props configuration of the implementing component,
   *  though it may also be destructured to use data sources other than props.
   */
  readonly props: Readonly<Props<ObjectProps>>

  /** Composes a wrapped object's functionality into a Vue component. */
  readonly use: (props: FromProps<ObjectProps>, wrapped: WrappedObject) => UseResult
}

/** An alias to `vue.ToRefs`, specifing the set of Refs that map to target type `T`. */
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
