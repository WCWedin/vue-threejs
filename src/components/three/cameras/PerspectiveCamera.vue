<template>
  <vue-threejs-perspective-camera>$slots</vue-threejs-perspective-camera>
</template>

<script setup lang="ts">
import { PerspectiveCamera } from 'three'
import { composablePerspectiveCamera } from '@/composables/three/cameras/PerspectiveCamera'
import { fromProps } from '@/composables/Wrapped'

const props = defineProps(composablePerspectiveCamera.props)
defineEmits(composablePerspectiveCamera.emits)
const propRefs = fromProps(props)
const perspectiveCamera = new PerspectiveCamera()
defineExpose(composablePerspectiveCamera.use(propRefs, perspectiveCamera))
</script>
