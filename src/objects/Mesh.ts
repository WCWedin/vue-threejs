import { BufferGeometry, Material, Mesh } from 'three'
import { defineComponent } from 'vue'
import { Object3DProps, composableObject3D } from '@/core/Object3D'
import { ComposableWrapper, Props, Emits, fromProps, FromProps, getSyncFunctions, mapRef } from '@/vue/Wrapped'
import { isInstanceOf, useScopeConsumer } from '@/vue/Scope'

export interface MeshProps extends Object3DProps {
  geometry: BufferGeometry | string
  material: Material | string
}

const meshProps: Props<MeshProps> = {
  ...composableObject3D.props,
  /** @borrows MeshProps.geometry */
  geometry: {
    type: [BufferGeometry, String],
    required: true
  },
  /** @borrows MeshProps.material */
  material: {
    type: [Material, String],
    required: true
  }
}

const meshEmits: Emits = { ...composableObject3D.emits }

function useMesh(props: FromProps<MeshProps>, mesh: Mesh) {
  const { getItem } = useScopeConsumer()
  const sync = getSyncFunctions(mesh)

  const geometry = getItem<BufferGeometry>(props.geometry, isInstanceOf(BufferGeometry))
  const defaultGeometry = new BufferGeometry()
  sync.geometry(mapRef(geometry, geometry => geometry || defaultGeometry))

  const material = getItem<Material>(props.material, isInstanceOf(Material))
  const defaultMaterial = new Material()
  sync.material(mapRef(material, material => material || defaultMaterial))

  return {
    mesh,
    ...composableObject3D.use(props, mesh)
  }
}

export const composableMaterial: ComposableWrapper<Mesh, MeshProps> = {
  props: meshProps,
  emits: meshEmits,
  use: useMesh
}

const meshComponent = defineComponent({
  name: 'Mesh',
  expose: [],
  props: composableMaterial.props,
  emits: composableMaterial.emits,
  setup(props) {
    return composableMaterial.use(fromProps(props), new Mesh())
  }
})

export default meshComponent
