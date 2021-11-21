import { PerspectiveCamera } from 'three'
import { composablePerspectiveCamera } from 'composables/three/cameras/PerspectiveCamera'
import { fromProps } from 'composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export default defineComponent({
  name: "ThreePerspectiveCamera",
  props: composablePerspectiveCamera.props,
  setup(props) {
    return composablePerspectiveCamera.use(fromProps(props), new PerspectiveCamera())
  },
  render(): VNode {
    return h('three-perspective-camera', null, this.$slots)
  }
})
