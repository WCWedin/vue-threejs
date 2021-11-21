import { PerspectiveCamera } from 'three'
import { composablePerspectiveCamera } from 'composables/three/cameras/PerspectiveCamera'
import { fromProps } from 'composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export default defineComponent({
  props: composablePerspectiveCamera.props,
  setup(props) {
    return composablePerspectiveCamera.use(fromProps(props), new PerspectiveCamera())
  },
  render(): VNode {
    return h('vue-threejs-perspective-camera', null, this.$slots)
  }
})
