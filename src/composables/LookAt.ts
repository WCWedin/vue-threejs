import { Object3D, Vector3 } from 'three'
import { watch } from 'vue'
import { ComposableWrapper, Props, FromProps } from 'vue-threejs/composables/Wrapped'
import { useScopeConsumer, isInstanceOf } from 'vue-threejs/composables/Scope'
import { mapRef } from 'vue-threejs/utils'

export interface LookAtProps {
  /** The target to orient the object toward. 
   *  @default null
   */
  lookTarget: Object3D | Vector3 | string | null

  // TODO: Behavior props?
}

const lookAtProps: Props<LookAtProps> = {
  /** @borrows LookAtProps.target */
  lookTarget: {
    type: [Object3D, Vector3, String],
    default: null,
    required: false
  }
}

function useLookAt(props: FromProps<LookAtProps>, object: Object3D) {
  const { getItem } = useScopeConsumer()
  const lookTarget = getItem(props.lookTarget, isInstanceOf<Object3D | Vector3 | null>(Object3D, Vector3))
  const lookPosition = mapRef(lookTarget, (value) => value instanceof Object3D ? value.position : value)
  watch([lookPosition, () => object.position],
    ([lookPosition]) => {
      if (lookPosition) {
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
