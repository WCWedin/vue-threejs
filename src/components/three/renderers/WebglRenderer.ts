import { WebGLRenderer } from 'three'
import { fromProps } from '@/composables/Wrapped'
import { composableWebglRenderer } from '@/composables/three/renderers/WebglRenderer'
import { defineComponent, h, Ref, ref, VNode, watch } from 'vue'
import styles from './WebglRenderer.css'

export default defineComponent({
  props: composableWebglRenderer.props,
  setup(props) {
    const div: Ref<HTMLDivElement | null> = ref(null)
    const webglRenderer = new WebGLRenderer()
    
    watch(div,
      (div) => {
        div?.appendChild(webglRenderer.domElement)
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
      div
    }
  },
  render(): VNode {
    return h('div', { class: styles.renderer }, this.$slots)
  }
})
