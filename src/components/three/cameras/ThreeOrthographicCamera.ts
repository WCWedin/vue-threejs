import { OrthographicCamera } from 'three'
import { fromProps } from 'vue-threejs/composables/Wrapped'
import { composableThreeOrthographicCamera } from 'vue-threejs/composables/three/cameras/ThreeOrthographicCamera'
import { defineComponent, h, VNode } from 'vue'

export const ThreeOrthographicCamera = defineComponent({
  name: "ThreeOrthographicCamera",
  props: composableThreeOrthographicCamera.props,
  setup(props) {
    const propRefs = fromProps(props)
    const orthographicCamera = new OrthographicCamera(propRefs.left.value, propRefs.right.value, propRefs.top.value, propRefs.bottom.value)
    return composableThreeOrthographicCamera.use(propRefs, orthographicCamera)
  },
  render(): VNode {
    return h('three-orthographic-camera', null, this.$slots)
  }
})

export default ThreeOrthographicCamera
