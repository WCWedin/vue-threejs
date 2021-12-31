import { BoxGeometry } from 'three'
import { computed, Ref, ToRefs } from 'vue'
import { ComposableWrapper, Props } from 'vue-threejs/composables/Wrapped'
import { BufferGeometryProps, composableThreeBufferGeometry } from '../core/ThreeBufferGeometry'

export interface BoxGeometryProps extends BufferGeometryProps {
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number
}

const boxGeometryProps: Props<BoxGeometryProps> = {
  ...composableThreeBufferGeometry.props,
  width: {
    type: Number,
    default: 1
  },
  height: {
    type: Number,
    default: 1
  },
  depth: {
    type: Number,
    default: 1
  },
  widthSegments: {
    type: Number,
    default: 1
  },
  heightSegments: {
    type: Number,
    default: 1
  },
  depthSegments: {
    type: Number,
    default: 1
  }
}

function useBoxGeometry(props: ToRefs<BoxGeometryProps>, boxGeometryRef: Ref<BoxGeometry>) {
  function updateGeometry() {
    const oldValue = boxGeometryRef.value
    boxGeometryRef.value = new BoxGeometry(
      props.width.value, props.height.value, props.depth.value,
      props.widthSegments.value, props.heightSegments.value, props.heightSegments.value
    )
    oldValue.dispose()
  }
  return {
    ...composableThreeBufferGeometry.use(props, boxGeometryRef),
    boxGeometry: computed(() => boxGeometryRef.value),
    updateGeometry
  }
}

export const composableThreeBoxGeometry: ComposableWrapper<Ref<BoxGeometry>, BoxGeometryProps, ReturnType<typeof useBoxGeometry>> = {
  props: boxGeometryProps,
  use: useBoxGeometry
}

export default composableThreeBoxGeometry
