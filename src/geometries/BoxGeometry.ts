import { BoxGeometry } from 'three'
import { defineComponent, ref, Ref, ToRefs } from 'vue'
import { ComposableWrapper, Props, Emits, fromProps } from '@/vue/Wrapped'
import { BufferGeometryProps, composableBufferGeometry } from '@/core/BufferGeometry'

export interface BoxGeometryProps extends BufferGeometryProps {
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number
}

const boxGeometryProps: Props<BoxGeometryProps> = {
  ...composableBufferGeometry.props,
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

const boxGeometryEmits: Emits = { ...composableBufferGeometry.emits }

function useBoxGeometry(props: ToRefs<BoxGeometryProps>, boxGeometryRef: Ref<BoxGeometry>) {
  const geometryProps: ToRefs<BoxGeometryProps> = fromProps(props)

  function updateGeometry() {
    const oldValue = boxGeometryRef.value
    boxGeometryRef.value = new BoxGeometry(
      geometryProps.width.value, geometryProps.height.value, geometryProps.depth.value,
      geometryProps.widthSegments.value, geometryProps.heightSegments.value, geometryProps.heightSegments.value
    )
    oldValue.dispose()
  }

  composableBufferGeometry.use(geometryProps, boxGeometryRef)

  return {
    boxGeometryRef,
    updateGeometry
  }
}

export const composableBoxGeometry: ComposableWrapper<Ref<BoxGeometry>, BoxGeometryProps> = {
  props: boxGeometryProps,
  emits: boxGeometryEmits,
  use: useBoxGeometry
}

const boxGeometryComponent = defineComponent({
  name: 'BoxGeometry',
  expose: [],
  props: { ...composableBoxGeometry.props },
  emits: { ...composableBoxGeometry.emits },
  setup(props) {
    const typedProps = fromProps(props)
    const boxGeometry = ref(new BoxGeometry(
      typedProps.width.value, typedProps.height.value, typedProps.depth.value,
      typedProps.widthSegments.value, typedProps.heightSegments.value, typedProps.depthSegments.value
    ))
    return composableBoxGeometry.use(typedProps, boxGeometry)
  }
})

export default boxGeometryComponent
