import { Material } from 'three'
import { composableThreeMaterial } from 'vue-threejs/composables/three/materials/ThreeMaterial'
import { fromProps } from 'vue-threejs/composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export const ThreeMaterial = defineComponent({
  name: 'ThreeMaterial',
  props: composableThreeMaterial.props,
  setup(props) {
    return composableThreeMaterial.use(fromProps(props), new Material())
  },
  render(): VNode {
    return h('three-material', null, this.$slots)
  }
})

export default ThreeMaterial
