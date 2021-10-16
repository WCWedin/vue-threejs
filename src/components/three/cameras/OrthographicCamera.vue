<script setup lang="ts">
import { OrthographicCamera } from 'three'
import { composableOrthographicCamera } from '@/composables/three/cameras/OrthographicCamera'
import { fromProps } from '@/composables/Wrapped'

const props = defineProps(composableOrthographicCamera.props)
defineEmits(composableOrthographicCamera.emits)
const propRefs = fromProps(props)
const orthographicCamera = new OrthographicCamera(propRefs.left.value, propRefs.right.value, propRefs.top.value, propRefs.bottom.value)
defineExpose(composableOrthographicCamera.use(propRefs, orthographicCamera))
</script>

<template>
  <vue-threejs-orthographic-camera>$slots</vue-threejs-orthographic-camera>
</template>
