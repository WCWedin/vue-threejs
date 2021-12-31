import { Scene, FogBase, Texture, Color, Material } from 'three'
import { watch } from 'vue'
import { hasProperty } from 'vue-threejs/utils'
import { ComposableWrapper, Props, FromProps } from 'vue-threejs/composables/Wrapped'
import { isInstanceOf } from 'vue-threejs/composables/Scope'
import { composableThreeObject3D, Object3DProps } from '../core/ThreeObject3D'

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

function isFog(value: unknown): value is FogBase {
  return value !== null
    && hasProperty(value, 'value', String)
    && hasProperty(value, 'color', Color)
    && hasProperty(value, 'clone', Function)
    && hasProperty(value, 'toJSON', Function)
}

const sceneProps: Props<SceneProps> = {
  ...composableThreeObject3D.props,
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

function useScene(props: FromProps<SceneProps>, scene: Scene) {
  const object3D = composableThreeObject3D.use(props, scene)

  const fog = object3D.getItem<FogBase | null>(props.fog, isFog)
  watch(fog,
    (fog) => {
      scene.fog = fog || null
    },
    { immediate: true }
  )

  const overrideMaterial = object3D.getItem<Material | null>(props.overrideMaterial, isInstanceOf(Material))
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

  const background = object3D.getItem<Color | Texture | null>(props.background, isBackground)
  watch(background,
    (background) => {
      scene.background = background || null
    },
    { immediate: true }
  )

  const environment = object3D.getItem<Texture | null>(props.environment, isInstanceOf(Texture))
  watch(environment,
    (environment) => {
      scene.environment = environment || null
    },
    { immediate: true }
  )

  return {
    ...object3D,
    scene
  }
}

export const composableThreeScene: ComposableWrapper<Scene, SceneProps, ReturnType<typeof useScene>> = {
  props: sceneProps,
  use: useScene
}

export default composableThreeScene
