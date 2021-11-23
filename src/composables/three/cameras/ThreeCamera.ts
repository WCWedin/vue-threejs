import { Camera } from 'three'
import { Object3DProps, composableThreeObject3D } from '../core/ThreeObject3D'
import { ComposableWrapper, FromProps } from 'composables/Wrapped'

export type CameraProps = Object3DProps

function useCamera(props: FromProps<CameraProps>, camera: Camera) {
  return {
    ...composableThreeObject3D.use(props, camera),
    matrixWorldInverse: camera.matrixWorldInverse,
    projectionMatrix: camera.projectionMatrix,
    projectionMatrixInverse: camera.projectionMatrixInverse,
    getWorldDirection: camera.getWorldDirection,
    updateMatrixWorld: camera.updateMatrixWorld,
    camera
  }
}

export const composableCamera: ComposableWrapper<Camera, CameraProps, ReturnType<typeof useCamera>> = {
  props: composableThreeObject3D.props,
  use: useCamera
}

export default composableCamera

export class View {
  enabled: boolean
  fullWidth: number
  fullHeight: number
  offsetX: number
  offsetY: number
  width: number
  height: number

  constructor(enabled: boolean, fullWidth: number, fullHeight: number, offsetX: number, offsetY: number, width: number, height: number) {
    this.enabled = enabled
    this.fullWidth = fullWidth
    this.fullHeight = fullHeight
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.width = width
    this.height = height
  }
}
