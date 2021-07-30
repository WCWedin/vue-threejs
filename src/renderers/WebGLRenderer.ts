import { Camera, Scene, WebGLRenderer } from 'three'
import { ComposableWrapper, Props, Emits, FromProps, fromProps } from '@/vue/Wrapped'
import { isInstanceOf, useScopeConsumer, useScopeProvider, useScopeStorage } from '@/vue/Scope'
import { defineComponent, watch } from '@vue/runtime-core'

// TODO: This is a large type with a few tricky bits that is almost entirely unmapped.
export interface WebglRendererProps {
  /** An optional name by which other components can retrieve the backing `WebglRenderer`.
   *  @default null
   */
  name: string | null
  scene: Scene | string,
  camera: Camera | string
}

const webglRendererProps: Props<WebglRendererProps> = {
  /** @borrows WebglRendererProps.name */
  name: {
    type: String,
    default: null
  },
  scene: {
    type: [Scene, String],
    required: true
  },
  camera: {
    type: [Camera, String],
    required: true
  }
}

const webglRendererEmits: Emits = {}

function useWebglRenderer(props: FromProps<WebglRendererProps>, webglRenderer: WebGLRenderer) {
  useScopeProvider()
  useScopeStorage(props.name, webglRenderer)
  const { getItem } = useScopeConsumer()

  const scene = getItem<Scene>(props.scene, isInstanceOf(Scene))
  const camera = getItem<Camera>(props.camera, isInstanceOf(Camera))

  // TODO: Re-rendering on any property change is maybe very silly, or maybe it's not.
  // The other option would be to call render every frame from the setAnimationLoop callback,
  // but that's a completely different, non-reactive idiom, so it might make sense to offer each separately.
  // webglRenderer.setAnimationLoop((time: number) => webglRenderer.render(scene, camera)
  let renderRequired = false
  watch([scene, camera],
    ([scene, camera]) => {
      renderRequired = !!(scene && camera)
    },
    {
      immediate: true,
      deep: true
    }
  )

  webglRenderer.setAnimationLoop(() => {
    if (renderRequired && scene.value && camera.value) {
      webglRenderer.render(scene.value, camera.value)
    }
  })

  return {
  }
}

export const composableWebglRenderer: ComposableWrapper<WebGLRenderer, WebglRendererProps> = {
  props: webglRendererProps,
  emits: webglRendererEmits,
  use: useWebglRenderer
}

const webglRendererComponent = defineComponent({
  name: 'WebglRenderer',
  expose: [],
  props: { ...composableWebglRenderer.props },
  emits: { ...composableWebglRenderer.emits },
  setup(props) {
    return composableWebglRenderer.use(fromProps(props), new WebGLRenderer())
  }
})

export default webglRendererComponent
