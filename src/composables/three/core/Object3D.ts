import { Euler, Matrix4, Object3D, Quaternion, Vector3 } from 'three'
import { computed, inject, InjectionKey, onMounted, onUnmounted, provide, ref, Ref, shallowRef, watch } from 'vue'
import { ComposableWrapper, Props, FromProps } from 'composables/Wrapped'
import { getSyncFunctions, getSyncByCopyFunctions, mapRef } from 'utils'
import { useScopeProvider, useScopeStorage } from 'composables/Scope'

/** A 3D rotation represented as a unit-vector rotation axis paired with rotation angle in radians. */
export class AxisAngle {
  /** A unit vector pointing along the axis of rotation. */
  axis: Vector3

  /** An angle in radians by which to rotate around the axis. */
  angle: number

  /**
   *  @param axis A unit vector pointing along the axis of rotation.
   *  @param angle An angle in radians by which to rotate around the given axis.
   */
  constructor(axis: Vector3, angle: number) {
    this.axis = axis
    this.angle = angle
  }
}

export interface Object3DProps {
  /** An optional name by which other components can retrieve the backing `Object3D`.
   *  @default null
   */
  name: string | null
  /** This object's local position.
   *  @default new THREE.Vector3()
   */
  position: Vector3
  /** This object's local rotation.
   *  @default new THREE.Quaternion()
   */
  rotation: Quaternion | Euler | Matrix4 | AxisAngle
  /** This object's local scale.
   *  @default new THREE.Vector3(1, 1, 1)
   */
  scale: Vector3
  /** Whether to render this object.
   *  @default true
   */
  visible: boolean
  /** Whether this object will be rendered into shadow maps.
   *  @default false
   */
  castsShadow: boolean
  /** Whether this object's material will have shadow receiving baked in.
   *  @default false
   */
  receivesShadow: boolean
  /** When this is true, this object will only render if it is in the frustum of the camera.
   *  Otherwise, the object is rendered even when outside the frustum.
   *  @default true
   */
  frustumCulled: boolean
  /** Overrides the default rendering order of scene graph objects, from lowest to highest renderOrder.
  *   Opaque and transparent objects remain sorted independently.
  *   When this property is set for an instance of Group, all descendants objects will be sorted and rendered together.
  *   @default 0
  */
  renderOrder: number
  /** An object that can be used to store custom data about the Material. It should not hold references to functions, as they will not be cloned.
   *  @default {}
   */
  userData: Record<string, unknown>
}

const object3DProps: Props<Object3DProps> = {
  /** @borrows Object3DProps.name */
  name: {
    type: String,
    default: null
  },
  /** @borrows Object3DProps.position */
  position: {
    type: Vector3,
    default: () => new Vector3(0, 0, 0)
  },
  /** @borrows Object3DProps.rotation */
  rotation: {
    type: [Quaternion, Euler, Matrix4, AxisAngle],
    default: (): Quaternion | Euler | Matrix4 | AxisAngle => new Quaternion()
  },
  /** @borrows Object3DProps.scale */
  scale: {
    type: Vector3,
    default: () => new Vector3(1, 1, 1)
  },
  /** @borrows Object3DProps.visible */
  visible: {
    type: Boolean,
    default: true
  },
  /** @borrows Object3DProps.castsShadow */
  castsShadow: {
    type: Boolean,
    default: false
  },
  /** @borrows Object3DProps.receivesShadow */
  receivesShadow: {
    type: Boolean,
    default: false
  },
  /** @borrows Object3DProps.frustumCulled */
  frustumCulled: {
    type: Boolean,
    default: true
  },
  /** @borrows Object3DProps.renderOrder */
  renderOrder: {
    type: Number,
    default: 0
  },
  /** @borrows Object3DProps.userData */
  userData: {
    type: Object,
    default: null
  }
}

const object3DKey: InjectionKey<Object3D> = Symbol('object3D')

function useObject3D(props: FromProps<Object3DProps>, object3D: Object3D) {
  const { getItem, storeRef } = useScopeProvider()
  const { storeRef: storeRef2 } = useScopeStorage(props.name, ref(object3D))

  // Keep this Object3D attached to its current closest Object3D ancestor, if any.
  provide(object3DKey, object3D)
  const parentObject3D: Ref<Object3D | null> = shallowRef(null)
  onMounted(() => {
    parentObject3D.value = inject(object3DKey, null)
  })
  onUnmounted(() => {
    parentObject3D.value = null
  })
  watch(parentObject3D,
    (parent, oldParent) => {
      oldParent?.remove(object3D)
      parent?.add(object3D)
    },
    { immediate: true }
  )

  const sync = getSyncFunctions(object3D)
  const syncByCopy = getSyncByCopyFunctions(object3D)
  sync.name(mapRef(props.name, (name) => name ?? ''))
  sync.visible(props.visible)
  sync.castShadow(props.castsShadow)
  sync.receiveShadow(props.receivesShadow)
  sync.frustumCulled(props.frustumCulled)
  sync.renderOrder(props.renderOrder)
  sync.userData(props.userData)
  syncByCopy.position(props.position)
  syncByCopy.scale(props.scale)

  // The rotation property accepts multiple types; the backing object3D has a corresponding set method for each type.
  watch(props.rotation,
    (rotation: Quaternion | Euler | Matrix4 | AxisAngle) => {
      if (rotation instanceof Quaternion) {
        object3D.setRotationFromQuaternion(rotation)
      } else if (rotation instanceof Euler) {
        object3D.setRotationFromEuler(rotation)
      } else if (rotation instanceof Matrix4) {
        object3D.setRotationFromMatrix(rotation)
      } else { // (rotation instanceof AxisAngle)
        object3D.setRotationFromAxisAngle(rotation.axis, rotation.angle)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    getItem,
    /** The object's position in world space. */
    worldPosition: computed(() => {
      const result = new Vector3()
      object3D.getWorldPosition(result)
      return result
    }),
    /** The object's rotation in world space as a Quaternion. */
    worldRotation: computed(() => {
      const result = new Quaternion()
      object3D.getWorldQuaternion(result)
      return result
    }),
    /** The object's scale in world space. */
    worldScale: computed(() => {
      const result = new Vector3()
      object3D.getWorldScale(result)
      return result
    }),
    /** The object's direction in world space. */
    worldDirection: computed(() => {
      const result = new Vector3()
      object3D.getWorldDirection(result)
      return result
    }),

    /** Writes this object's position in world space to the provided result Vector3. */
    getWorldPosition: object3D.getWorldPosition,
    /** Writes this object's rotation in world space to the provided result Quaternion. */
    getWorldRotation: object3D.getWorldQuaternion,
    /** Writes this object's scale in world space to the provided result Vector3. */
    getWorldScale: object3D.getWorldScale,
    /** Writes this object's direction in world space to the provided result Vector3. */
    getWorldDirection: object3D.getWorldDirection,
    /** Converts a position in world space to this object's local space. */
    localToWorld: object3D.localToWorld,
    /** Converts a position in this object's local space to world space. */
    worldToLocal: object3D.worldToLocal,

    /** Updates the object's local matrix. This is necessary after changing the object's position, rotation, or scale when matrixAutoUpdate is false. */
    updateMatrix: object3D.updateMatrix,
    /** Updates the object's world matrix, optionally also updating those of the object's ancestors or descendants. */
    updateWorldMatrix: object3D.updateWorldMatrix as (updateAncestors: boolean, updateDescendants: boolean) => void,

    /** Executes the provided callback function on this object and each of its descendants. */
    traverse(callback: (object: Readonly<Object3D>) => void) {
      object3D.traverse(callback)
    },
    /** Executes the provided callback function on this object and each of its ancestors. */
    traverseAncestors(callback: (object: Readonly<Object3D>) => void) {
      object3D.traverseAncestors(callback)
    },
    /** Executes the provided callback function on this object and each of its visible descendants. */
    traverseVisible(callback: (object: Readonly<Object3D>) => void) {
      object3D.traverseVisible(callback)
    },

    // TODO: yikes?
    onAfterRender: object3D.onAfterRender,
    onBeforeRender: object3D.onBeforeRender,

    // TODO: Implement reactive lookAt functionality as a composable.

    // TODO: these
    animations: object3D.animations,
    customDepthMaterial: object3D.customDepthMaterial,
    customDistanceMaterial: object3D.customDistanceMaterial,
    layers: object3D.layers,
    matrix: object3D.matrix,
    matrixAutoUpdate: object3D.matrixAutoUpdate,
    matrixWorld: object3D.matrixWorld,
    matrixWorldNeedsUpdate: object3D.matrixWorldNeedsUpdate,
    modelViewMatrix: object3D.modelViewMatrix,
    normalMatrix: object3D.normalMatrix,

    object3D,
    storeRef,
    storeRef2
  }
}

export const composableObject3D: ComposableWrapper<Object3D, Object3DProps, ReturnType<typeof useObject3D>> = {
  props: object3DProps,
  use: useObject3D
}
