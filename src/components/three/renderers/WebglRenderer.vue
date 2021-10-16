<script setup lang="ts">
import { WebGLRenderer } from 'three'
import { fromProps } from '@/composables/Wrapped'
import { composableWebglRenderer } from '@/composables/three/renderers/WebglRenderer'
import { Ref, ref, useCssModule, watch } from 'vue'

const props = defineProps(composableWebglRenderer.props)
defineEmits(composableWebglRenderer.emits)

const styles = useCssModule()
const div: Ref<HTMLDivElement | null> = ref(null)
const webglRenderer = new WebGLRenderer()
webglRenderer.domElement.classList.add(styles.fullSize!)

watch(div,
  (div) => {
    div?.appendChild(webglRenderer.domElement)
  },
  { flush: 'post' }
)

const composable = composableWebglRenderer.use(fromProps(props), webglRenderer)
defineExpose({
  ...{
    ...composable,
    // Renaming `render` prevents Vue DevTools from mistaking this property for a component, which would break inspectability.
    webglRenderer: { ...composable.webglRenderer, render: undefined, renderFunc: composable.webglRenderer.render }
  },
  div
})
</script>

<template>
  <div :ref="div" :class="$styles.fullSize">$slots</div>
</template>

<style module lang="postcss">
.full-size {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
