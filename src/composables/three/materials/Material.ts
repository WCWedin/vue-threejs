import { Material, Plane } from 'three'
import * as three from 'three'
import { defineComponent, h, ref, VNode, watch } from 'vue'
import { ComposableWrapper, Props, fromProps, FromProps } from '@/composables/Wrapped'
import { getSyncFunctions, mapRef, mapValueOf } from '@/utils'
import { useScopeStorage } from '@/composables/Scope'

export class Side extends Number {
  private static frontSide = new Side(three.FrontSide)
  static get FrontSide() { return Side.frontSide }
  private static backSide = new Side(three.BackSide)
  static get BackSide() { return Side.backSide }
  private static doubleSide = new Side(three.DoubleSide)
  static get DoubleSide() { return Side.doubleSide }
}

export class Shading extends Number {
  private static flatShading = new Shading(three.FlatShading)
  static get FlatShading() { return Shading.flatShading }
  private static smoothShading = new Shading(three.SmoothShading)
  static get SmoothShading() { return Shading.smoothShading }
}

export class Blending extends Number {
  private static noBlending = new Blending(three.NoBlending)
  static get NoBlending() { return Blending.noBlending }
  private static normalBlending = new Blending(three.NormalBlending)
  static get NormalBlending() { return Blending.normalBlending }
  private static additiveBlending = new Blending(three.AdditiveBlending)
  static get AdditiveBlending() { return Blending.additiveBlending }
  private static subtractiveBlending = new Blending(three.SubtractiveBlending)
  static get SubtractiveBlending() { return Blending.subtractiveBlending }
  private static multiplyBlending = new Blending(three.MultiplyBlending)
  static get MultiplyBlending() { return Blending.multiplyBlending }
  private static customBlending = new Blending(three.CustomBlending)
  static get CustomBlending() { return Blending.customBlending }
}

export class BlendingEquation extends Number {
  private static addEquation = new BlendingEquation(three.AddEquation)
  static get AddEquation() { return BlendingEquation.addEquation }
  private static subtractEquation = new BlendingEquation(three.SubtractEquation)
  static get SubtractEquation() { return BlendingEquation.subtractEquation }
  private static reverseSubtractEquation = new BlendingEquation(three.ReverseSubtractEquation)
  static get ReverseSubtractEquation() { return BlendingEquation.reverseSubtractEquation }
  private static minEquation = new BlendingEquation(three.MinEquation)
  static get MinEquation() { return BlendingEquation.minEquation }
  private static maxEquation = new BlendingEquation(three.MaxEquation)
  static get MaxEquation() { return BlendingEquation.maxEquation }
}

export class BlendingDstFactor extends Number {
  private static zeroFactor = new BlendingDstFactor(three.ZeroFactor)
  static get ZeroFactor() { return BlendingDstFactor.zeroFactor }
  private static oneFactor = new BlendingDstFactor(three.OneFactor)
  static get OneFactor() { return BlendingDstFactor.oneFactor }
  private static srcColorFactor = new BlendingDstFactor(three.SrcColorFactor)
  static get SrcColorFactor() { return BlendingDstFactor.srcColorFactor }
  private static oneMinusSrcColorFactor = new BlendingDstFactor(three.OneMinusSrcColorFactor)
  static get OneMinusSrcColorFactor() { return BlendingDstFactor.oneMinusSrcColorFactor }
  private static srcAlphaFactor = new BlendingDstFactor(three.SrcAlphaFactor)
  static get SrcAlphaFactor() { return BlendingDstFactor.srcAlphaFactor }
  private static oneMinusSrcAlphaFactor = new BlendingDstFactor(three.OneMinusSrcAlphaFactor)
  static get OneMinusSrcAlphaFactor() { return BlendingDstFactor.oneMinusSrcAlphaFactor }
  private static dstAlphaFactor = new BlendingDstFactor(three.DstAlphaFactor)
  static get DstAlphaFactor() { return BlendingDstFactor.dstAlphaFactor }
  private static oneMinusDstAlphaFactor = new BlendingDstFactor(three.OneMinusDstAlphaFactor)
  static get OneMinusDstAlphaFactor() { return BlendingDstFactor.oneMinusDstAlphaFactor }
  private static dstColorFactor = new BlendingDstFactor(three.DstColorFactor)
  static get DstColorFactor() { return BlendingDstFactor.dstColorFactor }
  private static oneMinusDstColorFactor = new BlendingDstFactor(three.OneMinusDstColorFactor)
  static get OneMinusDstColorFactor() { return BlendingDstFactor.oneMinusDstColorFactor }
}

export class BlendingSrcFactor extends Number {
  private static srcAlphaSaturateFactor = new BlendingSrcFactor(three.SrcAlphaSaturateFactor)
  static get SrcAlphaSaturateFactor() { return BlendingSrcFactor.srcAlphaSaturateFactor }
}

export class DepthModes extends Number {
  private static neverDepth = new DepthModes(three.NeverDepth)
  static get NeverDepth() { return DepthModes.neverDepth }
  private static alwaysDepth = new DepthModes(three.AlwaysDepth)
  static get AlwaysDepth() { return DepthModes.alwaysDepth }
  private static lessDepth = new DepthModes(three.LessDepth)
  static get LessDepth() { return DepthModes.lessDepth }
  private static lessEqualDepth = new DepthModes(three.LessEqualDepth)
  static get LessEqualDepth() { return DepthModes.lessEqualDepth }
  private static equalDepth = new DepthModes(three.EqualDepth)
  static get EqualDepth() { return DepthModes.equalDepth }
  private static greaterEqualDepth = new DepthModes(three.GreaterEqualDepth)
  static get GreaterEqualDepth() { return DepthModes.greaterEqualDepth }
  private static greaterDepth = new DepthModes(three.GreaterDepth)
  static get GreaterDepth() { return DepthModes.greaterDepth }
  private static notEqualDepth = new DepthModes(three.NotEqualDepth)
  static get NotEqualDepth() { return DepthModes.notEqualDepth }
}

export class StencilOp extends Number {
  private static zeroStencilOp = new StencilOp(three.ZeroStencilOp)
  static get ZeroStencilOp() { return StencilOp.zeroStencilOp }
  private static keepStencilOp = new StencilOp(three.KeepStencilOp)
  static get KeepStencilOp() { return StencilOp.keepStencilOp }
  private static replaceStencilOp = new StencilOp(three.ReplaceStencilOp)
  static get ReplaceStencilOp() { return StencilOp.replaceStencilOp }
  private static incrementStencilOp = new StencilOp(three.IncrementStencilOp)
  static get IncrementStencilOp() { return StencilOp.incrementStencilOp }
  private static decrementStencilOp = new StencilOp(three.DecrementStencilOp)
  static get DecrementStencilOp() { return StencilOp.decrementStencilOp }
  private static incrementWrapStencilOp = new StencilOp(three.IncrementWrapStencilOp)
  static get IncrementWrapStencilOp() { return StencilOp.incrementWrapStencilOp }
  private static decrementWrapStencilOp = new StencilOp(three.DecrementWrapStencilOp)
  static get DecrementWrapStencilOp() { return StencilOp.decrementWrapStencilOp }
  private static invertStencilOp = new StencilOp(three.InvertStencilOp)
  static get InvertStencilOp() { return StencilOp.invertStencilOp }
}

export class StencilFunc extends Number {
  private static neverStencilFunc = new StencilOp(three.NeverStencilFunc)
  static get NeverStencilFunc() { return StencilFunc.neverStencilFunc }
  private static lessStencilFunc = new StencilOp(three.LessStencilFunc)
  static get LessStencilFunc() { return StencilFunc.lessStencilFunc }
  private static equalStencilFunc = new StencilOp(three.EqualStencilFunc)
  static get EqualStencilFunc() { return StencilFunc.equalStencilFunc }
  private static lessEqualStencilFunc = new StencilOp(three.LessEqualStencilFunc)
  static get LessEqualStencilFunc() { return StencilFunc.lessEqualStencilFunc }
  private static greaterStencilFunc = new StencilOp(three.GreaterStencilFunc)
  static get GreaterStencilFunc() { return StencilFunc.greaterStencilFunc }
  private static notEqualStencilFunc = new StencilOp(three.NotEqualStencilFunc)
  static get NotEqualStencilFunc() { return StencilFunc.notEqualStencilFunc }
  private static greaterEqualStencilFunc = new StencilOp(three.GreaterEqualStencilFunc)
  static get GreaterEqualStencilFunc() { return StencilFunc.greaterEqualStencilFunc }
  private static alwaysStencilFunc = new StencilOp(three.AlwaysStencilFunc)
  static get AlwaysStencilFunc() { return StencilFunc.alwaysStencilFunc }
}

export class Precision extends String {
  private static low = new Precision('lowp')
  static get Low() { return Precision.low }
  private static medium = new Precision('mediump')
  static get Medium() { return Precision.medium }
  private static high = new Precision('highp')
  static get High() { return Precision.high }

  public valueOf() {
    return <'lowp' | 'mediump' | 'highp'>(super.valueOf())
  }
}

export class ClippingPlanes extends Array<Plane> { }

export interface MaterialProps {
  /** An optional name by which other components can retrieve the backing `Material`.
   *  @default null
   */
  name: string | null
  /** Sets the alpha value to be used when running an alpha test.
   *  @default 0
   */
  alphaTest: number
  /** Enables alpha to coverage. Can only be used with MSAA-enabled rendering contexts.
   *  @default false
   */
  alphaToCoverage: boolean
  /** Blending destination.
   *  @default {@link BlendingDstFactor.OneMinusSrcAlphaFactor }
   */
  blendDst: BlendingDstFactor
  /** The tranparency of the {@link blendDst}.
   *  @default null
   */
  blendDstAlpha: number | null
  /** Blending equation to use when applying blending.
   *  @default {@link BlendingEquation.AddEquation}
   */
  blendEquation: BlendingEquation
  /** The tranparency of the blendEquation.
   *  @default null
   */
  blendEquationAlpha: number | null
  /** Which blending to use when displaying objects with this material.
   *  @default {@link Blending.NormalBlending}
   */
  blending: Blending
  /** Blending source.
   *  @default {@link BlendingSrcFactor.SrcAlphaFactor}
   */
  blendSrc: BlendingSrcFactor | BlendingDstFactor
  /** The tranparency of the blendSrc.
   *  @default null
   */
  blendSrcAlpha: number | null
  /** Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union.
   *  @default false
   */
  clipIntersection: boolean
  /** User-defined clipping planes, specified as {@link three.Plane} objects in world space.
   *  These planes apply to the objects this material is attached to.
   *  Points in space whose signed distance to the plane is negative are clipped (not rendered).
   *  See the WebGL / clipping /intersection example.
   *  @default null
   */
  clippingPlanes: ClippingPlanes | null
  /** Defines whether to clip shadows according to the clipping planes specified on this material.
   *  @default false
   */
  clipShadows: boolean
  /** Whether to render the material's color. This can be used in conjunction with a mesh's .renderOrder property to create invisible objects that occlude other objects.
   *  @default true
   */
  colorWrite: boolean
  /** Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }.
   *  The pairs are defined in both vertex and fragment shaders.
   *  @default null
   */
  defines: { [key: string]: unknown } | null
  /** Which depth function to use.
   *  @default {@link DepthModes.LessEqualDepth }
   */
  depthFunc: DepthModes
  /** Whether to have depth test enabled when rendering this material.
   *  @default true
   */
  depthTest: boolean
  /** Whether rendering this material has any effect on the depth buffer.
   * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
   * @default true
   */
  depthWrite: boolean
  /** Whether the material is affected by fog.
   * @default true
   */
  fog: boolean
  /** Opacity.
   *  @default 1
   */
  opacity: number
  /** Whether to use polygon offset. This corresponds to the POLYGON_OFFSET_FILL WebGL feature.
   *  @default false
   */
  polygonOffset: boolean
  /** Sets the polygon offset factor.
   *  @default 0
   */
  polygonOffsetFactor: number
  /** Sets the polygon offset units.
   *  @default 0
   */
  polygonOffsetUnits: number
  /** Override the renderer's default precision for this material.
   *  @default null
   */
  precision: Precision | null
  /** Whether to premultiply the alpha (transparency) value.
   *  @default false
   */
  premultipliedAlpha: boolean
  /** Whether to apply dithering to the color to remove the appearance of banding.
   *  @default false
   */
  dithering: boolean
  /** Defines which of the face sides will be rendered.
   *  @default Side.FrontSide
   */
  side: Side
  /** Overrides which face sides will cast shadows.
   *  @default null
   */
  shadowSide: Side | null
  /** Whether rendering this material has any effect on the stencil buffer.
   *  @default false
   */
  stencilWrite: boolean
  /** The stencil comparison function to use.
   * @default {@link StencilFunc.AlwaysStencilFunc}
   */
  stencilFunc: StencilFunc
  /** The value to use when performing stencil comparisons or stencil operations.
   * @default 0
   */
  stencilRef: number
  /** The bit mask to use when writing to the stencil buffer.
   *  @default 0xff
   */
  stencilWriteMask: number
  /** The bit mask to use when comparing against the stencil buffer.
   *  @default 0xff
   */
  stencilFuncMask: number
  /** Which stencil operation to perform when the comparison function returns false.
   *  @default {@link StencilOp.KeepStencilOp}
   */
  stencilFail: StencilOp
  /** Which stencil operation to perform when the comparison function returns true but the depth test fails.
   *  @default {@link StencilOp.KeepStencilOp}
   */
  stencilZFail: StencilOp
  /** Which stencil operation to perform when the comparison function returns true and the depth test passes.
   *  @default {@link StencilOp.KeepStencilOp}
   */
  stencilZPass: StencilOp
  /** Defines whether this material is tone mapped according to the renderer's toneMapping setting.
   *  @default true
   */
  toneMapped: boolean
  /** Defines whether this material is transparent.
   *  This has an effect on rendering, as transparent objects need special treatment and are rendered after non-transparent objects.
   *  When set to true, the extent to which the material is transparent is controlled by setting it's {@link opacity} property.
   * @default false
   */
  transparent: boolean
  /** An object that can be used to store custom data about the Material. It should not hold references to functions, as they will not be cloned.
   *  @default {}
   */
  userData: Record<string, unknown>
  /** Defines whether vertex coloring is used.
   *  @default false
   */
  vertexColors: boolean
  /** Defines whether this material is visible.
   *  @default true
   */
  visible: boolean
}

const materialProps: Props<MaterialProps> = {
  /** @borrows MaterialProps.name */
  name: {
    type: String,
    default: null
  },
  /** @borrows MaterialProps.alphaTest */
  alphaTest: {
    type: Number,
    default: 0
  },
  /** @borrows MaterialProps.alphaToCoverage */
  alphaToCoverage: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.blendDst */
  blendDst: {
    type: BlendingDstFactor,
    default: BlendingDstFactor.OneMinusSrcAlphaFactor
  },
  /** @borrows MaterialProps.blendDstAlpha */
  blendDstAlpha: {
    type: Number,
    default: null
  },
  /** @borrows MaterialProps.blendEquation */
  blendEquation: {
    type: Number,
    default: BlendingEquation.AddEquation
  },
  /** @borrows MaterialProps.blendEquationAlpha */
  blendEquationAlpha: {
    type: Number,
    default: null
  },
  /** @borrows MaterialProps.blending */
  blending: {
    type: Blending,
    default: Blending.NormalBlending
  },
  /** @borrows MaterialProps.blendSrc */
  blendSrc: {
    type: [BlendingSrcFactor, BlendingDstFactor],
    default: BlendingDstFactor.SrcAlphaFactor
  },
  /** @borrows MaterialProps.blendSrcAlpha */
  blendSrcAlpha: {
    type: Number,
    default: null
  },
  /** @borrows MaterialProps.clipIntersection */
  clipIntersection: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.clippingPlanes */
  clippingPlanes: {
    type: ClippingPlanes,
    default: null
  },
  /** @borrows MaterialProps.clipShadows */
  clipShadows: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.colorWrite */
  colorWrite: {
    type: Boolean,
    default: true
  },
  /** @borrows MaterialProps.defines */
  defines: {
    type: Object,
    default: null
  },
  /** @borrows MaterialProps.depthFunc */
  depthFunc: {
    type: DepthModes,
    default: DepthModes.LessEqualDepth
  },
  /** @borrows MaterialProps.depthTest */
  depthTest: {
    type: Boolean,
    default: true
  },
  /** @borrows MaterialProps.depthWrite */
  depthWrite: {
    type: Boolean,
    default: true
  },
  /** @borrows MaterialProps.fog */
  fog: {
    type: Boolean,
    default: true
  },
  /** @borrows MaterialProps.opacity */
  opacity: {
    type: Number,
    default: 1
  },
  /** @borrows MaterialProps.polygonOffset */
  polygonOffset: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.polygonOffsetFactor */
  polygonOffsetFactor: {
    type: Number,
    default: 0
  },
  /** @borrows MaterialProps.polygonOffsetUnits */
  polygonOffsetUnits: {
    type: Number,
    default: 0
  },
  /** @borrows MaterialProps.precision */
  precision: {
    type: Precision,
    default: null
  },
  /** @borrows MaterialProps.premultipliedAlpha */
  premultipliedAlpha: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.dithering */
  dithering: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.side */
  side: {
    type: Side,
    default: Side.FrontSide
  },
  /** @borrows MaterialProps.shadowSide */
  shadowSide: {
    type: Side,
    default: null
  },
  /** @borrows MaterialProps.stencilWrite */
  stencilWrite: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.stencilFunc */
  stencilFunc: {
    type: StencilFunc,
    default: StencilFunc.AlwaysStencilFunc
  },
  /** @borrows MaterialProps.stencilRef */
  stencilRef: {
    type: Number,
    default: 0
  },
  /** @borrows MaterialProps.stencilWriteMask */
  stencilWriteMask: {
    type: Number,
    default: 0xff
  },
  /** @borrows MaterialProps.stencilFuncMask */
  stencilFuncMask: {
    type: Number,
    default: 0xff
  },
  /** @borrows MaterialProps.stencilFail */
  stencilFail: {
    type: StencilOp,
    default: StencilOp.KeepStencilOp
  },
  /** @borrows MaterialProps.stencilZFail */
  stencilZFail: {
    type: StencilOp,
    default: StencilOp.KeepStencilOp
  },
  /** @borrows MaterialProps.stencilZPass */
  stencilZPass: {
    type: StencilOp,
    default: StencilOp.KeepStencilOp
  },
  /** @borrows MaterialProps.toneMapped */
  toneMapped: {
    type: Boolean,
    default: true
  },
  /** @borrows MaterialProps.transparent */
  transparent: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.userData */
  userData: {
    type: Object,
    default: null
  },
  /** @borrows MaterialProps.vertexColors */
  vertexColors: {
    type: Boolean,
    default: false
  },
  /** @borrows MaterialProps.visible */
  visible: {
    type: Boolean,
    default: true
  }
}

function useMaterial(props: FromProps<MaterialProps>, material: Material) {
  const { storeRef } = useScopeStorage(props.name, ref(material))
  const sync = getSyncFunctions(material)

  sync.name(mapRef(props.name, (name) => name ?? ''))
  sync.alphaToCoverage(props.alphaToCoverage)
  sync.alphaToCoverage(props.alphaToCoverage)
  sync.blendDst(mapValueOf(props.blendDst))
  sync.blendDstAlpha(props.blendDstAlpha)
  sync.blendEquation(mapValueOf(props.blendEquation))
  sync.blendEquationAlpha(props.blendEquationAlpha)
  sync.blending(mapValueOf(props.blending))
  sync.blendSrc(mapValueOf(props.blendSrc))
  sync.blendSrcAlpha(props.blendSrcAlpha)
  sync.clipIntersection(props.clipIntersection)
  sync.clippingPlanes(props.clippingPlanes)
  sync.clipShadows(props.clipShadows)
  sync.colorWrite(props.colorWrite)
  sync.defines(mapRef(props.defines, (defines) => defines ?? undefined))
  sync.depthFunc(mapValueOf(props.depthFunc))
  sync.depthTest(props.depthTest)
  sync.depthWrite(props.depthWrite)
  sync.opacity(props.opacity)
  sync.polygonOffset(props.polygonOffset)
  sync.polygonOffsetFactor(props.polygonOffsetFactor)
  sync.polygonOffsetUnits(props.polygonOffsetUnits)
  sync.premultipliedAlpha(props.premultipliedAlpha)
  sync.dithering(props.dithering)
  sync.side(mapValueOf(props.side))
  sync.stencilWrite(props.stencilWrite)
  sync.stencilFunc(mapValueOf(props.stencilFunc))
  sync.stencilRef(props.stencilRef)
  sync.stencilWriteMask(props.stencilWriteMask)
  sync.stencilFuncMask(props.stencilFuncMask)
  sync.stencilFail(mapValueOf(props.stencilFail))
  sync.stencilZFail(mapValueOf(props.stencilZFail))
  sync.stencilZPass(mapValueOf(props.stencilZPass))
  sync.toneMapped(props.toneMapped)
  sync.transparent(props.transparent)
  sync.userData(props.userData)
  sync.visible(props.visible)

  watch(props.alphaTest,
    (alphaTest) => {
      if (material.alphaTest !== alphaTest) {
        material.alphaTest = alphaTest
        material.needsUpdate = true
      }
    },
    {
      immediate: true
    }
  )

  watch(props.fog,
    (fog) => {
      if (material.fog !== fog) {
        material.fog = fog
        material.needsUpdate = true
      }
    },
    {
      immediate: true
    }
  )

  watch(props.precision,
    (precision) => {
      material.precision = precision?.valueOf() ?? null
    },
    {
      immediate: true
    }
  )

  watch(props.shadowSide,
    (shadowSide) => {
      material.shadowSide = shadowSide?.valueOf() ?? null
    },
    {
      immediate: true
    }
  )

  watch(props.vertexColors,
    (vertexColors) => {
      if (material.vertexColors !== vertexColors) {
        material.vertexColors = vertexColors
        material.needsUpdate = true
      }
    },
    {
      immediate: true
    }
  )

  return {
    material,
    storeRef
  }
}

export const composableMaterial: ComposableWrapper<Material, MaterialProps, ReturnType<typeof useMaterial>> = {
  props: materialProps,
  use: useMaterial
}

const materialComponent = defineComponent({
  name: 'ThreeMaterial',
  props: composableMaterial.props,
  setup(props) {
    return composableMaterial.use(fromProps(props), new Material())
  },
  render(): VNode {
    return h('vue-threejs-material', null, this.$slots)
  }
})

export default materialComponent
