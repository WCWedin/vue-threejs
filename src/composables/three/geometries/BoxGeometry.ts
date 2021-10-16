import { BoxGeometry } from 'three'
import { computed, DefineComponent, defineComponent, h, ref, Ref, ToRefs, VNode } from 'vue'
import { ComposableWrapper, Props, fromProps } from '@/composables/Wrapped'
import { BufferGeometryProps, composableBufferGeometry } from '../core/BufferGeometry'

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
    ...composableBufferGeometry.use(props, boxGeometryRef),
    boxGeometry: computed(() => boxGeometryRef.value),
    updateGeometry
  }
}

export const composableBoxGeometry: ComposableWrapper<Ref<BoxGeometry>, BoxGeometryProps, ReturnType<typeof useBoxGeometry>> = {
  props: boxGeometryProps,
  emits: composableBufferGeometry.emits,
  use: useBoxGeometry
}

const boxGeometryComponent = defineComponent({
  name: 'BoxGeometry',
  props: { ...composableBoxGeometry.props },
  emits: { ...composableBoxGeometry.emits },
  setup(props) {
    const typedProps = fromProps(props)
    const boxGeometry = ref(new BoxGeometry(
      typedProps.width.value, typedProps.height.value, typedProps.depth.value,
      typedProps.widthSegments.value, typedProps.heightSegments.value, typedProps.depthSegments.value
    ))

    return composableBoxGeometry.use(typedProps, boxGeometry)
  },
  render(): VNode {
    return h('vue-threejs-box-geometry', null, this.$slots)
  }
})

export default boxGeometryComponent
