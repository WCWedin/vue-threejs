import { Camera, Scene, Vector2, WebGLRenderer } from 'three'
import { ComposableWrapper, Props, FromProps } from 'vue-threejs/composables/Wrapped'
import { isInstanceOf, useScopeConsumer, useScopeProvider } from 'vue-threejs/composables/Scope'
import { ref, watch } from 'vue'

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

function useWebglRenderer(props: FromProps<WebglRendererProps>, webglRenderer: WebGLRenderer) {
  // TODO: Pass in exposes and accepts.
  useScopeProvider()
  const { getItem, storeItem } = useScopeConsumer()
  storeItem(props.name, ref(webglRenderer))
  const scene = getItem<Scene>(props.scene, isInstanceOf(Scene))
  const camera = getItem<Camera>(props.camera, isInstanceOf(Camera))

  function setSize(width: number, height: number) {
    // TODO: The side effects here require thought.
    webglRenderer.setSize(width, height, false)
    // TODO: Somehow set camera dimensions; this is a reactive, polymorphic nightmare.
    // For instance: camera.value!.updateProjectionMatrix()
  }

  const canvas = webglRenderer.domElement
  const resizeObserver = new ResizeObserver(() => {
    const size = new Vector2()
    webglRenderer.getSize(size)
    if (canvas.clientWidth !== size.width || canvas.clientHeight !== size.height) {
      setSize(canvas.clientWidth, canvas.clientHeight)
    }
  })
  resizeObserver.observe(canvas)

  // TODO: Re-rendering on any property change is maybe very silly, or maybe it's not.
  // The other option would be to render only upon request; easy enough to make into a property.
  let renderRequired = false
  watch(scene,
    (scene) => {
      if (scene !== undefined) {
        renderRequired = true
      }
    },
    {
      immediate: true,
      deep: true
    }
  )
  watch(camera,
    (camera) => {
      if (camera !== undefined) {
        renderRequired = true
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  webglRenderer.setAnimationLoop(() => {
    if (renderRequired && scene.value && camera.value) {
      renderRequired = false
      webglRenderer.render(scene.value, camera.value)
    }
  })

  return {
    webglRenderer
  }
}

export const composableThreeWebglRenderer: ComposableWrapper<WebGLRenderer, WebglRendererProps, ReturnType<typeof useWebglRenderer>> = {
  props: webglRendererProps,
  use: useWebglRenderer
}

export default composableThreeWebglRenderer
