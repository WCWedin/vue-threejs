import { WebGLRenderer } from 'three'
import { fromProps } from 'composables/Wrapped'
import { composableWebglRenderer } from 'composables/three/renderers/WebglRenderer'
import { defineComponent, h, Ref, ref, VNode, watch } from 'vue'
import styles from './WebglRenderer.css'

export default defineComponent({
  name: 'ThreeWebglRenderer',
  props: composableWebglRenderer.props,
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

    const composable = composableWebglRenderer.use(fromProps(props), webglRenderer)
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
