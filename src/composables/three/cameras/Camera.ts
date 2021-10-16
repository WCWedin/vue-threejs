import { Camera } from 'three'
import { Object3DProps, composableObject3D } from '../core/Object3D'
import { ComposableWrapper, FromProps } from '@/composables/Wrapped'

export type CameraProps = Object3DProps

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

export const composableCamera: ComposableWrapper<Camera, CameraProps, ReturnType<typeof useCamera>> = {
  props: composableObject3D.props,
  emits: composableObject3D.emits,
  use: useCamera
}

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
