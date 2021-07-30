import { Scene, FogBase, Texture, Color, Material } from 'three'
import { defineComponent, watch } from 'vue'
import { composableObject3D, Object3DProps } from '@/core/Object3D'
import { ComposableWrapper, Props, Emits, fromProps, FromProps } from '@/vue/Wrapped'
import { isInstanceOf, useScopeConsumer } from '@/vue/Scope'

export interface SceneProps extends Object3DProps {
  /**
  * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
  * @default null
  */
  fog: FogBase | string | null

  /** A material to be applied to all objects in the scene.
   *  @default null
   */
  overrideMaterial: Material | string | null

  /**
   * @default true
   */
  autoUpdate: boolean

  /**
   * @default null
   */
  background: Color | Texture | string | null

  /**
   * @default null
   */
  environment: Texture | string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFog(value: any): value is FogBase {
  return typeof value === 'object'
    && value !== null
    && typeof value.value === 'string'
    && typeof value.color === 'object'
    && typeof value.clone === 'function'
    && typeof value.toJSON === 'function'
}

const sceneProps: Props<SceneProps> = {
  ...composableObject3D.props,
  fog: {
    type: [Object, String],
    validator: (value) => isFog(value) || typeof value === 'string',
    default: null
  },
  overrideMaterial: {
    type: [Material, String],
    default: null
  },
  autoUpdate: {
    type: Boolean
  },
  background: {
    type: [Color, Texture, String],
    default: null
  },
  environment: {
    type: [Texture, String],
    default: null
  }
}

const sceneEmits: Emits = { ...composableObject3D.emits }

function useScene(props: FromProps<SceneProps>, scene: Scene) {
  const { getItem } = useScopeConsumer()

  const fog = getItem<FogBase | null>(props.fog, isFog)
  watch(fog,
    (fog) => {
      scene.fog = fog || null
    },
    { immediate: true }
  )

  const overrideMaterial = getItem<Material | null>(props.overrideMaterial, isInstanceOf(Material))
  watch(overrideMaterial,
    (overrideMaterial) => {
      scene.overrideMaterial = overrideMaterial || null
    },
    { immediate: true }
  )

  watch(props.autoUpdate,
    (autoUpdate) => {
      scene.autoUpdate = autoUpdate
    },
    { immediate: true }
  )

  function isBackground(value: unknown): value is Color | Texture | null {
    return value instanceof Color
      || value instanceof Texture
      || value === null
  }

  const background = getItem<Color | Texture | null>(props.background, isBackground)
  watch(background,
    (background) => {
      scene.background = background || null
    },
    { immediate: true }
  )

  const environment = getItem<Texture | null>(props.environment, isInstanceOf(Texture))
  watch(environment,
    (environment) => {
      scene.environment = environment || null
    },
    { immediate: true }
  )

  return {
    ...composableObject3D.use(props, scene),
    scene
  }
}

export const composableScene: ComposableWrapper<Scene, SceneProps> = {
  props: sceneProps,
  emits: sceneEmits,
  use: useScene
}

const sceneComponent = defineComponent({
  name: 'Scene',
  expose: [],
  props: { ...composableScene.props },
  emits: { ...composableScene.emits },
  setup(props) {
    return composableScene.use(fromProps(props), new Scene())
  }
})

export default sceneComponent
