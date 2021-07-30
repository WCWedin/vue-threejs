import { Euler, Matrix4, Object3D, Quaternion, Vector3 } from 'three'
import { ComposableWrapper, Props, Emits, FromProps, isRefTo, getSyncFunctions, getSyncByCopyFunctions, mapRef } from '@/vue/Wrapped'
import { computed, Ref, watch } from 'vue'
import { useScopeProvider, useScopeStorage } from '@/vue/Scope'

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

// TODO: Implement reactive lookAt functionality as a composable.

// TODO: Add remaining object3D props and doc
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

const object3DEmits: Emits = {}

function useObject3D(props: FromProps<Object3DProps>, object3D: Object3D) {
  // As the Vue component tree changes, this callback will handle the mounting and unmounting of this object's Object3D children.
  function mountOrUnmountObject3D(ref: Ref<unknown>, name: string | null, oldName: string | null) {
    if (isRefTo(ref, Object3D)) {
      if (name === null) {
        object3D.remove(ref.value)
      } else if (oldName === null) {
        object3D.add(ref.value)
      }
    }
  }
  useScopeProvider(mountOrUnmountObject3D)
  useScopeStorage(props.name, object3D)

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
    /** The underlying object3D. */
    object3D,
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

    /** Write this object's position in world space to the provided result Vector3. */
    getWorldPosition: object3D.getWorldPosition,
    /** Write this object's rotation in world space to the provided result Quaternion. */
    getWorldRotation: object3D.getWorldQuaternion,
    /** Write this object's scale in world space to the provided result Vector3. */
    getWorldScale: object3D.getWorldScale,
    /** Write this object's direction in world space to the provided result Vector3. */
    getWorldDirection: object3D.getWorldDirection,
    /** Convert a position in world space to this object's local space. */
    localToWorld: object3D.localToWorld,
    /** Convert a position in this object's local space to world space. */
    worldToLocal: object3D.worldToLocal,
    // TODO: add remaining functions and doc
    updateMatrix: object3D.updateMatrix
  }
}

export const composableObject3D: ComposableWrapper<Object3D, Object3DProps> = {
  props: object3DProps,
  emits: object3DEmits,
  use: useObject3D
}
