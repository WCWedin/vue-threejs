import { OrthographicCamera } from 'three'
import { composableOrthographicCamera } from 'composables/three/cameras/OrthographicCamera'
import { fromProps } from 'composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export default defineComponent({
  props: composableOrthographicCamera.props,
  setup(props) {
    const propRefs = fromProps(props)
    const orthographicCamera = new OrthographicCamera(propRefs.left.value, propRefs.right.value, propRefs.top.value, propRefs.bottom.value)
    return composableOrthographicCamera.use(propRefs, orthographicCamera)
  },
  render(): VNode {
    return h('three-orthographic-camera', null, this.$slots)
  }
})
