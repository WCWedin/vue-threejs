import { PerspectiveCamera } from 'three'
import { composableThreePerspectiveCamera } from 'composables/three/cameras/ThreePerspectiveCamera'
import { fromProps } from 'composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export const ThreePerspectiveCamera = defineComponent({
  name: "ThreePerspectiveCamera",
  props: composableThreePerspectiveCamera.props,
  setup(props) {
    return composableThreePerspectiveCamera.use(fromProps(props), new PerspectiveCamera())
  },
  render(): VNode {
    return h('three-perspective-camera', null, this.$slots)
  }
})

export default ThreePerspectiveCamera
