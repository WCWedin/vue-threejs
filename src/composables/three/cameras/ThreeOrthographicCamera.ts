import { Camera, OrthographicCamera } from 'three'
import { CameraProps, composableCamera, View } from './ThreeCamera'
import { ComposableWrapper, Props, FromProps, } from 'composables/Wrapped'
import { getSyncFunctions } from 'utils'

export interface OrthographicCameraProps extends CameraProps {
  /**
   *  @default 1
   */
  zoom: number

  /** Camera frustum near plane.
   *  @default 0.1
   */
  near: number

  /** Camera frustum far plane.
   *  @default 2000
   */
  far: number

  left: number
  right: number
  top: number
  bottom: number

  /**
   *  @default null
   */
  view: View | null
}

const orthographicCameraProps: Props<OrthographicCameraProps> = {
  ...composableCamera.props,
  /** @borrows OrthographicCameraProps.near */
  near: {
    type: Number,
    default: 0.1
  },
  /** @borrows OrthographicCameraProps.far */
  far: {
    type: Number,
    default: 2000
  },
  /** @borrows OrthographicCameraProps.left */
  left: {
    type: Number,
    required: true
  },
  /** @borrows OrthographicCameraProps.right */
  right: {
    type: Number,
    required: true
  },
  /** @borrows OrthographicCameraProps.top */
  top: {
    type: Number,
    required: true
  },
  /** @borrows OrthographicCameraProps.bottom */
  bottom: {
    type: Number,
    required: true
  },
  /** @borrows OrthographicCameraProps.view */
  view: {
    type: View,
    default: null
  },
  /** @borrows OrthographicCameraProps.zoom */
  zoom: {
    type: Number,
    default: 1
  }
}

function useOrthographicCamera(props: FromProps<OrthographicCameraProps>, orthographicCamera: OrthographicCamera) {
  const sync = getSyncFunctions<OrthographicCamera, Camera>(orthographicCamera)
  sync.near(props.near)
  sync.far(props.far)
  sync.top(props.top)
  sync.bottom(props.bottom)
  sync.left(props.left)
  sync.right(props.right)
  sync.view(props.view)
  sync.zoom(props.zoom)

  return {
    ...composableCamera.use(props, orthographicCamera),
    /** Sets an offset in a larger frustum. This is useful for multi-window or multi-monitor/multi-machine setups. */
    setViewOffset: orthographicCamera.setViewOffset,
    clearViewOffset: orthographicCamera.clearViewOffset,
    updateProjectionMatrix: orthographicCamera.updateProjectionMatrix,
    orthographicCamera
  }
}

export const composableThreeOrthographicCamera: ComposableWrapper<OrthographicCamera, OrthographicCameraProps, ReturnType<typeof useOrthographicCamera>> = {
  props: orthographicCameraProps,
  use: useOrthographicCamera
}

export default composableThreeOrthographicCamera
