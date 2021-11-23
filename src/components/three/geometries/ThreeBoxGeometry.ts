import { BoxGeometry } from 'three'
import { composableThreeBoxGeometry } from 'composables/three/geometries/ThreeBoxGeometry'
import { fromProps } from 'composables/Wrapped'
import { defineComponent, h, VNode, ref } from 'vue'

export const ThreeBoxGeometry = defineComponent({
  name: 'ThreeBoxGeometry',
  props: { ...composableThreeBoxGeometry.props },
  setup(props) {
    const typedProps = fromProps(props)
    const boxGeometry = ref(new BoxGeometry(
      typedProps.width.value, typedProps.height.value, typedProps.depth.value,
      typedProps.widthSegments.value, typedProps.heightSegments.value, typedProps.depthSegments.value
    ))

    return composableThreeBoxGeometry.use(typedProps, boxGeometry)
  },
  render(): VNode {
    return h('three-box-geometry', null, this.$slots)
  }
})

export default ThreeBoxGeometry
