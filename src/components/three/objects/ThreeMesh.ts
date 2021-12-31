import { Mesh } from 'three'
import { fromProps } from 'vue-threejs/composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'
import { composableThreeMesh } from 'vue-threejs/composables/three/objects/ThreeMesh'

export const ThreeMesh = defineComponent({
  name: 'ThreeMesh',
  props: composableThreeMesh.props,
  setup(props) {
    return composableThreeMesh.use(fromProps(props), new Mesh())
  },
  render(): VNode {
    return h('three-mesh', null, this.$slots)
  }
})

export default ThreeMesh
