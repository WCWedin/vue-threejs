import { BufferGeometry, Material, Mesh } from 'three'
import { defineComponent, h, VNode } from 'vue'
import { Object3DProps, composableObject3D } from '../core/Object3D'
import { ComposableWrapper, Props, fromProps, FromProps } from 'composables/Wrapped'
import { getSyncFunctions, mapRef } from 'utils'
import { isInstanceOf, useScopeProvider } from 'composables/Scope'

export interface MeshProps extends Object3DProps {
  geometry: BufferGeometry | string | null
  material: Material | string | null
}

const meshProps: Props<MeshProps> = {
  ...composableObject3D.props,
  /** @borrows MeshProps.geometry */
  geometry: {
    type: [BufferGeometry, String],
    default: null
  },
  /** @borrows MeshProps.material */
  material: {
    type: [Material, String],
    default: null
  }
}

function useMesh(props: FromProps<MeshProps>, mesh: Mesh) {
  const { getItem, storeRef } = useScopeProvider()
  const sync = getSyncFunctions(mesh)

  const geometry = getItem<BufferGeometry | null>(props.geometry, isInstanceOf(BufferGeometry))
  const defaultGeometry = new BufferGeometry()
  sync.geometry(mapRef(geometry, geometry => geometry ?? defaultGeometry))

  const material = getItem<Material | null>(props.material, isInstanceOf(Material))
  const defaultMaterial = new Material()
  sync.material(mapRef(material, material => material ?? defaultMaterial))

  return {
    ...composableObject3D.use(props, mesh),
    mesh,
    storeRef
  }
}

export const composableMaterial: ComposableWrapper<Mesh, MeshProps, ReturnType<typeof useMesh>> = {
  props: meshProps,
  use: useMesh
}

const meshComponent = defineComponent({
  name: 'ThreeMesh',
  props: composableMaterial.props,
  setup(props) {
    return composableMaterial.use(fromProps(props), new Mesh())
  },
  render(): VNode {
    return h('three-mesh', null, this.$slots)
  }
})

export default meshComponent
