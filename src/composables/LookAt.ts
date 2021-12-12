import { Object3D, Vector3 } from 'three'
import { isRef, Ref, watch } from 'vue'
import { ComposableWrapper, Props, FromProps } from 'composables/Wrapped'
import { useScopeConsumer, isInstanceOf } from 'composables/Scope'
import { mapRef } from 'utils'

export interface LookAtProps {
  /** The target to orient the object toward. */
  lookTarget: Ref<Object3D | Vector3 | string>

  // TODO: Behavior props?
}

const lookAtProps: Props<LookAtProps> = {
  /** @borrows LookAtProps.target */
  lookTarget: {
    type: Object,
    validator: (target) => {
      return isRef<Object3D>(target)
        || isRef<Vector3>(target)
        || isRef<string>(target)
    }
  }
}

function useLookAt(props: FromProps<LookAtProps>, object: Object3D) {
  const { getItem } = useScopeConsumer()
  const lookTarget = getItem(props.lookTarget, isInstanceOf<Object3D | Vector3>(Object3D, Vector3))
  const lookPosition = mapRef(lookTarget, (value) => value instanceof Object3D ? value.position : value)
  watch([lookPosition, () => object.position],
    ([lookPosition]) => {
      if (lookPosition !== undefined) {
        object.lookAt(lookPosition)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    lookTarget,
    lookPosition
  }
}

export const composableLookAt: ComposableWrapper<Object3D, LookAtProps, ReturnType<typeof useLookAt>> = {
  props: lookAtProps,
  use: useLookAt
}

export default composableLookAt
