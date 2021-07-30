import { BufferAttribute, BufferGeometry, InterleavedBufferAttribute } from 'three'
import { computed, readonly, Ref, ToRefs, watch } from 'vue'
import { ComposableWrapper, Props, Emits, getSyncFunctions, mapRef } from '@/vue/Wrapped'
import { useScopeStorage } from '@/vue/Scope'

export class DrawRange {
  public start: number
  public count: number

  constructor(start: number, count: number) {
    this.start = start
    this.count = count
  }
}

export class Group extends DrawRange {
  materialIndex?: number | undefined

  constructor(start: number, count: number, materialIndex?: number | undefined) {
    super(start, count)
    this.materialIndex = materialIndex
  }
}

export class Groups extends Array<Group> { }

export interface BufferGeometryProps {
  /** An optional name by which other components can retrieve the backing `BufferGeometry`.
   *  @default null
   */
  name: string | null
  /**
   *  @default null
   */
  index: BufferAttribute | null
  /**
   *  @default {}
   */
  morphAttributes: {
    [name: string]: Array<BufferAttribute | InterleavedBufferAttribute>
  }
  /**
   *  @default false
   */
  morphTargetsRelative: boolean
  /** An object that can be used to store custom data about the BufferGeometry. It should not hold references to functions, as they will not be cloned.
   *  @default {}
   */
  userData: { [key: string]: unknown }
}

const bufferGeometryProps: Props<BufferGeometryProps> = {
  /** @borrows BufferGeometryProps.name */
  name: {
    type: String,
    default: null
  },
  /** @borrows BufferGeometryProps.index */
  index: {
    type: BufferAttribute,
    default: null
  },
  /** @borrows BufferGeometryProps.morphAttributes */
  morphAttributes: {
    type: Object,
    default: {}
  },
  /** @borrows BufferGeometryProps.morphTargetsRelative */
  morphTargetsRelative: {
    type: Boolean,
    default: false
  },
  /** @borrows BufferGeometryProps.userData */
  userData: {
    type: Object,
    default: null
  }
}

const bufferGeometryEmits: Emits = {}

function useBufferGeometry(props: ToRefs<BufferGeometryProps>, bufferGeometryRef: Ref<BufferGeometry>) {
  useScopeStorage(props.name, bufferGeometryRef)

  watch(bufferGeometryRef,
    (geometry) => {
      const sync = getSyncFunctions(geometry)
      sync.name(mapRef(props.name, (name) => name ?? ''))
      sync.index(props.index)
      sync.morphAttributes(props.morphAttributes)
      sync.morphTargetsRelative(props.morphTargetsRelative)
      sync.userData(props.userData)
    },
    { immediate: true }
  )

  return {
    bufferGeometryRef,
    attributes: computed(() => readonly(bufferGeometryRef.value.attributes)),
    computeBoundingBox: bufferGeometryRef.value.computeBoundingBox,
    boundingBox: computed(() => bufferGeometryRef.value.boundingBox),
    computeBoundingSphere: bufferGeometryRef.value.computeBoundingSphere,
    boundingSphere: computed(() => bufferGeometryRef.value.boundingSphere),
    computeTangents: bufferGeometryRef.value.computeTangents,
    tangents: computed(() => bufferGeometryRef.value.getAttribute('tangent')),
    computeVertexNormals: bufferGeometryRef.value.computeVertexNormals,
    vertexNormals: computed(() => bufferGeometryRef.value.getAttribute('normal')),
    groups: computed(() => readonly(bufferGeometryRef.value.groups)),
    addGroup: bufferGeometryRef.value.addGroup,
    drawRange: computed(() => readonly(bufferGeometryRef.value.drawRange)),
    setDrawRange: bufferGeometryRef.value.setDrawRange
  }
}

export const composableBufferGeometry: ComposableWrapper<Ref<BufferGeometry>, BufferGeometryProps> = {
  props: bufferGeometryProps,
  emits: bufferGeometryEmits,
  use: useBufferGeometry
}
