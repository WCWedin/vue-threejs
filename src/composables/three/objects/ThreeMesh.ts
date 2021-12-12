import { BufferGeometry, Material, Mesh } from 'three'
import { Object3DProps, composableThreeObject3D } from '../core/ThreeObject3D'
import { ComposableWrapper, Props, FromProps } from 'composables/Wrapped'
import { getSyncFunctions, mapRef } from 'utils'
import { isInstanceOf, useScopeConsumer } from 'composables/Scope'
import { ref } from 'vue'

export interface MeshProps extends Object3DProps {
  geometry: BufferGeometry | string | null
  material: Material | string | null
}

const meshProps: Props<MeshProps> = {
  ...composableThreeObject3D.props,
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
  const { getItem, storeItem } = useScopeConsumer()
  storeItem(props.name, ref(mesh))

  const sync = getSyncFunctions(mesh)

  const geometry = getItem<BufferGeometry | null>(props.geometry, isInstanceOf(BufferGeometry))
  const defaultGeometry = new BufferGeometry()
  sync.geometry(mapRef(geometry, geometry => geometry ?? defaultGeometry))

  const material = getItem<Material | null>(props.material, isInstanceOf(Material))
  const defaultMaterial = new Material()
  sync.material(mapRef(material, material => material ?? defaultMaterial))

  return {
    ...composableThreeObject3D.use(props, mesh),
    mesh
  }
}

export const composableThreeMesh: ComposableWrapper<Mesh, MeshProps, ReturnType<typeof useMesh>> = {
  props: meshProps,
  use: useMesh
}

export default composableThreeMesh
