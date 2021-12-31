import { WebGLRenderer } from 'three'
import { fromProps } from 'vue-threejs/composables/Wrapped'
import { defineComponent, h, Ref, ref, VNode, watch } from 'vue'
import { composableThreeWebglRenderer }  from 'vue-threejs/composables/three/renderers/ThreeWebglRenderer'
import styles from './ThreeWebglRenderer.css'

export const ThreeWebglRenderer = defineComponent({
  name: 'ThreeWebglRenderer',
  props: composableThreeWebglRenderer.props,
  setup(props) {
    const vueRoot: Ref<HTMLElement | null> = ref(null)
    const webglRenderer = new WebGLRenderer()
    const canvas = webglRenderer.domElement
    
    watch(vueRoot,
      (vueRoot) => {
        canvas.classList.add(styles.renderer)
        vueRoot?.parentElement?.replaceChild(canvas, vueRoot)
      },
      { flush: 'post' }
    )

    const composable = composableThreeWebglRenderer.use(fromProps(props), webglRenderer)
    return {
      ...{
        ...composable,
        // Renaming `render` prevents Vue DevTools from mistaking this property for a component, which would otherwise break inspectability.
        webglRenderer: { ...composable.webglRenderer, render: undefined, renderFunc: composable.webglRenderer.render }
      },
      vueRoot
    }
  },
  render(): VNode {
    return h('three-webgl-renderer', { ref: 'vueRoot' }, this.$slots)
  }
})

export default ThreeWebglRenderer
