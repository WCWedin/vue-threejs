import { Scene } from 'three'
import { composableThreeScene } from 'vue-threejs/composables/three/scenes/ThreeScene'
import { fromProps } from 'vue-threejs/composables/Wrapped'
import { defineComponent, h, VNode } from 'vue'

export const ThreeScene = defineComponent({
  name: 'ThreeScene',
  props: { ...composableThreeScene.props },
  setup(props) {
    const scene = new Scene()
    return composableThreeScene.use(fromProps(props), scene)
  },
  render(): VNode {
    return h('three-scene', null, this.$slots)
  }
})

export default ThreeScene
