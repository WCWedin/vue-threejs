import { Camera, PerspectiveCamera } from 'three'
import { CameraProps, composableCamera, View } from './ThreeCamera'
import { ComposableWrapper, Props, FromProps } from 'composables/Wrapped'
import { getSyncFunctions } from 'utils'

export interface PerspectiveCameraProps extends CameraProps {
  /**
   *  @default 1
   */
  zoom: number

  /** Camera frustum vertical field of view, from bottom to top of view, in degrees.
   *  @default 50
   */
  fov: number

  /** Camera frustum aspect ratio, window width divided by window height.
   *  @default 1
   */
  aspect: number

  /** Camera frustum near plane.
   *  @default 0.1
   */
  near: number

  /** Camera frustum far plane.
   *  @default 2000
   */
  far: number

  /**
   *  @default 10
   */
  focus: number

  /**
   *  @default null
   */
  view: View | null

  /**
   *  @default 35
   */
  filmGauge: number

  /**
   *  @default 0
   */
  filmOffset: number
}

const perspectiveCameraProps: Props<PerspectiveCameraProps> = {
  ...composableCamera.props,
  /** @borrows PerspectiveCameraProps.zoom */
  zoom: {
    type: Number,
    default: 1
  },
  /** @borrows PerspectiveCameraProps.fov */
  fov: {
    type: Number,
    default: 50
  },
  /** @borrows PerspectiveCameraProps.aspect */
  aspect: {
    type: Number,
    default: 1
  },
  /** @borrows PerspectiveCameraProps.near */
  near: {
    type: Number,
    default: 0.1
  },
  /** @borrows PerspectiveCameraProps.far */
  far: {
    type: Number,
    default: 2000
  },
  /** @borrows PerspectiveCameraProps.focus */
  focus: {
    type: Number,
    default: 10
  },
  /** @borrows PerspectiveCameraProps.view */
  view: {
    type: View,
    default: null
  },
  /** @borrows PerspectiveCameraProps.filmGauge */
  filmGauge: {
    type: Number,
    default: 35
  },
  /** @borrows PerspectiveCameraProps.filmOffset */
  filmOffset: {
    type: Number,
    default: 0
  }
}

function usePerspectiveCamera(props: FromProps<PerspectiveCameraProps>, perspectiveCamera: PerspectiveCamera) {
  const sync = getSyncFunctions<PerspectiveCamera, Camera>(perspectiveCamera)
  sync.aspect(props.aspect)
  sync.far(props.far)
  sync.filmGauge(props.filmGauge)
  sync.filmOffset(props.filmOffset)
  sync.focus(props.focus)
  sync.fov(props.fov)
  sync.near(props.near)
  sync.view(props.view)
  sync.zoom(props.zoom)

  return {
    ...composableCamera.use(props, perspectiveCamera),
    /** Sets an offset in a larger frustum. This is useful for multi-window or multi-monitor/multi-machine setups. */
    setViewOffset: perspectiveCamera.setViewOffset,
    clearViewOffset: perspectiveCamera.clearViewOffset,
    updateProjectionMatrix: perspectiveCamera.updateProjectionMatrix,
    setFocalLength: perspectiveCamera.setFocalLength,
    getFocalLength: perspectiveCamera.getFocalLength,
    getEffectiveFOV: perspectiveCamera.getEffectiveFOV,
    getFilmWidth: perspectiveCamera.getFilmWidth,
    getFilmHeight: perspectiveCamera.getFilmHeight,
    perspectiveCamera
  }
}

export const composableThreePerspectiveCamera: ComposableWrapper<PerspectiveCamera, PerspectiveCameraProps, ReturnType<typeof usePerspectiveCamera>> = {
  props: perspectiveCameraProps,
  use: usePerspectiveCamera
}

export default composableThreePerspectiveCamera
