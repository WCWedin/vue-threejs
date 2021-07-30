import { Camera } from 'three'
import { Object3DProps, composableObject3D } from '@/core/Object3D'
import { ComposableWrapper, Props, Emits, FromProps } from '@/vue/Wrapped'

export type CameraProps = Object3DProps

const cameraProps: Props<CameraProps> = { ...composableObject3D.props }

const cameraEmits: Emits = { ...composableObject3D.emits }

function useCamera(props: FromProps<CameraProps>, camera: Camera) {
  return {
    ...composableObject3D.use(props, camera),
    matrixWorldInverse: camera.matrixWorldInverse,
    projectionMatrix: camera.projectionMatrix,
    projectionMatrixInverse: camera.projectionMatrixInverse,
    getWorldDirection: camera.getWorldDirection,
    updateMatrixWorld: camera.updateMatrixWorld,
    camera
  }
}

export const composableCamera: ComposableWrapper<Camera, CameraProps> = {
  props: cameraProps,
  emits: cameraEmits,
  use: useCamera
}
