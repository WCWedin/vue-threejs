import * as three from 'three'

export class Mouse extends Number {
  private static left = new Mouse(three.MOUSE.LEFT)
  static get Left() { return Mouse.left }
  private static middle = new Mouse(three.MOUSE.MIDDLE)
  static get Middle() { return Mouse.middle }
  private static right = new Mouse(three.MOUSE.RIGHT)
  static get Right() { return Mouse.right }
  private static rotate = new Mouse(three.MOUSE.ROTATE)
  static get Rotate() { return Mouse.rotate }
  private static dolly = new Mouse(three.MOUSE.DOLLY)
  static get Dolly() { return Mouse.dolly }
  private static pan = new Mouse(three.MOUSE.PAN)
  static get Pan() { return Mouse.pan }
}

export class Touch extends Number {
  private static rotate = new Touch(three.TOUCH.ROTATE)
  static get Rotate() { return Touch.rotate }
  private static pan = new Touch(three.TOUCH.PAN)
  static get Pan() { return Touch.pan }
  private static dollyPan = new Touch(three.TOUCH.DOLLY_PAN)
  static get DollyPan() { return Touch.dollyPan }
  private static dollyRotate = new Touch(three.TOUCH.DOLLY_ROTATE)
  static get DollyRotate() { return Touch.dollyRotate }
}

// GL STATE CONSTANTS
export class CullFace extends Number {
  private static cullFaceNone = new CullFace(three.CullFaceNone)
  static get CullFaceNone() { return CullFace.cullFaceNone }
  private static cullFaceBack = new CullFace(three.CullFaceBack)
  static get CullFaceBack() { return CullFace.cullFaceBack }
  private static cullFaceFront = new CullFace(three.CullFaceFront)
  static get CullFaceFront() { return CullFace.cullFaceFront }
  private static cullFaceFrontBack = new CullFace(three.CullFaceFrontBack)
  static get CullFaceFrontBack() { return CullFace.cullFaceFrontBack }
}

export class ShadowMapType extends Number {
  private static basicShadowMap = new ShadowMapType(three.BasicShadowMap)
  static get BasicShadowMap() { return ShadowMapType.basicShadowMap }
  private static pcfShadowMap = new ShadowMapType(three.PCFShadowMap)
  static get PcfShadowMap() { return ShadowMapType.pcfShadowMap }
  private static pcfSoftShadowMap = new ShadowMapType(three.PCFSoftShadowMap)
  static get PcfSoftShadowMap() { return ShadowMapType.pcfSoftShadowMap }
  private static vsmShadowMap = new ShadowMapType(three.VSMShadowMap)
  static get VsmShadowMap() { return ShadowMapType.vsmShadowMap }
}

// TEXTURE CONSTANTS
export class Combine extends Number {
  private static multiplyOperation = new Combine(three.MultiplyOperation)
  static get MultiplyOperation() { return Combine.multiplyOperation }
  private static mixOperation = new Combine(three.MixOperation)
  static get MixOperation() { return Combine.mixOperation }
  private static addOperation = new Combine(three.AddOperation)
  static get AddOperation() { return Combine.addOperation }
}

export class ToneMapping extends Number {
  private static noToneMapping = new ToneMapping(three.NoToneMapping)
  static get NoToneMapping() { return ToneMapping.noToneMapping }
  private static linearToneMapping = new ToneMapping(three.LinearToneMapping)
  static get LinearToneMapping() { return ToneMapping.linearToneMapping }
  private static reinhardToneMapping = new ToneMapping(three.ReinhardToneMapping)
  static get ReinhardToneMapping() { return ToneMapping.reinhardToneMapping }
  private static cineonToneMapping = new ToneMapping(three.CineonToneMapping)
  static get CineonToneMapping() { return ToneMapping.cineonToneMapping }
  private static acesFilmicToneMapping = new ToneMapping(three.ACESFilmicToneMapping)
  static get AcesFilmicToneMapping() { return ToneMapping.acesFilmicToneMapping }
  // TODO: This constant is missing from the binding. https://github.com/three-types/three-ts-types/pull/141
  private static customToneMapping = new ToneMapping(5)
  static get CustomToneMapping() { return ToneMapping.customToneMapping }
  CustomToneMapping = 5
}

export class Mapping extends Number {
  private static uvMapping = new Mapping(three.UVMapping)
  static get UvMapping() { return Mapping.uvMapping }
  private static cubeReflectionMapping = new Mapping(three.CubeReflectionMapping)
  static get CubeReflectionMapping() { return Mapping.cubeReflectionMapping }
  private static cubeRefractionMapping = new Mapping(three.CubeRefractionMapping)
  static get CubeRefractionMapping() { return Mapping.cubeRefractionMapping }
  private static equirectangularReflectionMapping = new Mapping(three.EquirectangularReflectionMapping)
  static get EquirectangularReflectionMapping() { return Mapping.equirectangularReflectionMapping }
  private static equirectangularRefractionMapping = new Mapping(three.EquirectangularRefractionMapping)
  static get EquirectangularRefractionMapping() { return Mapping.equirectangularRefractionMapping }
  private static cubeUvReflectionMapping = new Mapping(three.CubeUVReflectionMapping)
  static get CubeUvReflectionMapping() { return Mapping.cubeUvReflectionMapping }
  private static cubeUvRefractionMapping = new Mapping(three.CubeUVRefractionMapping)
  static get CubeUvRefractionMapping() { return Mapping.cubeUvRefractionMapping }
}

export class Wrapping extends Number {
  private static repeatWrapping = new Wrapping(three.RepeatWrapping)
  static get RepeatWrapping() { return Wrapping.repeatWrapping }
  private static clampToEdgeWrapping = new Wrapping(three.ClampToEdgeWrapping)
  static get ClampToEdgeWrapping() { return Wrapping.clampToEdgeWrapping }
  private static mirroredRepeatWrapping = new Wrapping(three.MirroredRepeatWrapping)
  static get MirroredRepeatWrapping() { return Wrapping.mirroredRepeatWrapping }
}

export class TextureFilter extends Number {
  private static nearestFilter = new TextureFilter(three.NearestFilter)
  static get NearestFilter() { return TextureFilter.nearestFilter }
  private static nearestMipmapNearestFilter = new TextureFilter(three.NearestMipmapNearestFilter)
  static get NearestMipmapNearestFilter() { return TextureFilter.nearestMipmapNearestFilter }
  private static nearestMipmapLinearFilter = new TextureFilter(three.NearestMipmapLinearFilter)
  static get NearestMipmapLinearFilter() { return TextureFilter.nearestMipmapLinearFilter }
  private static linearFilter = new TextureFilter(three.LinearFilter)
  static get LinearFilter() { return TextureFilter.linearFilter }
  private static linearMipmapNearestFilter = new TextureFilter(three.LinearMipmapNearestFilter)
  static get LinearMipmapNearestFilter() { return TextureFilter.linearMipmapNearestFilter }
  private static linearMipmapLinearFilter = new TextureFilter(three.LinearMipmapLinearFilter)
  static get LinearMipmapLinearFilter() { return TextureFilter.linearMipmapLinearFilter }
}

// TODO: The rest of these will have to be refactored into static classes to be easily used as Vue prop types.

export enum TextureDataType {
  UnsignedByteType = three.UnsignedByteType.valueOf(),
  ByteType = three.ByteType.valueOf(),
  ShortType = three.ShortType.valueOf(),
  UnsignedShortType = three.UnsignedShortType.valueOf(),
  IntType = three.IntType.valueOf(),
  UnsignedIntType = three.UnsignedIntType.valueOf(),
  FloatType = three.FloatType.valueOf(),
  HalfFloatType = three.HalfFloatType.valueOf(),
  UnsignedShort4444Type = three.UnsignedShort4444Type.valueOf(),
  UnsignedShort5551Type = three.UnsignedShort5551Type.valueOf(),
  UnsignedShort565Type = three.UnsignedShort565Type.valueOf(),
  UnsignedInt248Type = three.UnsignedInt248Type.valueOf()
}

export enum PixelFormat {
  AlphaFormat = three.AlphaFormat.valueOf(),
  RGBFormat = three.RGBFormat.valueOf(),
  RGBAFormat = three.RGBAFormat.valueOf(),
  LuminanceFormat = three.LuminanceFormat.valueOf(),
  LuminanceAlphaFormat = three.LuminanceAlphaFormat.valueOf(),
  RGBEFormat = three.RGBEFormat.valueOf(),
  DepthFormat = three.DepthFormat.valueOf(),
  DepthStencilFormat = three.DepthStencilFormat.valueOf(),
  RedFormat = three.RedFormat.valueOf(),
  RedIntegerFormat = three.RedIntegerFormat.valueOf(),
  RGFormat = three.RGFormat.valueOf(),
  RGIntegerFormat = three.RGIntegerFormat.valueOf(),
  RGBIntegerFormat = three.RGBIntegerFormat.valueOf(),
  RGBAIntegerFormat = three.RGBAIntegerFormat.valueOf()
}

export type PixelFormatGPU = three.PixelFormatGPU

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export enum CompressedPixelFormat {
  RGB_S3TC_DXT1_Format = three.RGB_S3TC_DXT1_Format.valueOf(),
  RGBA_S3TC_DXT1_Format = three.RGBA_S3TC_DXT1_Format.valueOf(),
  RGBA_S3TC_DXT3_Format = three.RGBA_S3TC_DXT3_Format.valueOf(),
  RGBA_S3TC_DXT5_Format = three.RGBA_S3TC_DXT5_Format.valueOf(),

  // PVRTC compressed './texture formats
  RGB_PVRTC_4BPPV1_Format = three.RGB_PVRTC_4BPPV1_Format.valueOf(),
  RGB_PVRTC_2BPPV1_Format = three.RGB_PVRTC_2BPPV1_Format.valueOf(),
  RGBA_PVRTC_4BPPV1_Format = three.RGBA_PVRTC_4BPPV1_Format.valueOf(),
  RGBA_PVRTC_2BPPV1_Format = three.RGBA_PVRTC_2BPPV1_Format.valueOf(),

  // ETC compressed texture formats
  RGB_ETC1_Format = three.RGB_ETC1_Format.valueOf(),
  RGB_ETC2_Format = three.RGB_ETC2_Format.valueOf(),
  RGBA_ETC2_EAC_Format = three.RGBA_ETC2_EAC_Format.valueOf(),

  // ASTC compressed texture formats
  RGBA_ASTC_4x4_Format = three.RGBA_ASTC_4x4_Format.valueOf(),
  RGBA_ASTC_5x4_Format = three.RGBA_ASTC_5x4_Format.valueOf(),
  RGBA_ASTC_5x5_Format = three.RGBA_ASTC_5x5_Format.valueOf(),
  RGBA_ASTC_6x5_Format = three.RGBA_ASTC_6x5_Format.valueOf(),
  RGBA_ASTC_6x6_Format = three.RGBA_ASTC_6x6_Format.valueOf(),
  RGBA_ASTC_8x5_Format = three.RGBA_ASTC_8x5_Format.valueOf(),
  RGBA_ASTC_8x6_Format = three.RGBA_ASTC_8x6_Format.valueOf(),
  RGBA_ASTC_8x8_Format = three.RGBA_ASTC_8x8_Format.valueOf(),
  RGBA_ASTC_10x5_Format = three.RGBA_ASTC_10x5_Format.valueOf(),
  RGBA_ASTC_10x6_Format = three.RGBA_ASTC_10x6_Format.valueOf(),
  RGBA_ASTC_10x8_Format = three.RGBA_ASTC_10x8_Format.valueOf(),
  RGBA_ASTC_10x10_Format = three.RGBA_ASTC_10x10_Format.valueOf(),
  RGBA_ASTC_12x10_Format = three.RGBA_ASTC_12x10_Format.valueOf(),
  RGBA_ASTC_12x12_Format = three.RGBA_ASTC_12x12_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_4x4_Format = three.SRGB8_ALPHA8_ASTC_4x4_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_5x4_Format = three.SRGB8_ALPHA8_ASTC_5x4_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_5x5_Format = three.SRGB8_ALPHA8_ASTC_5x5_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_6x5_Format = three.SRGB8_ALPHA8_ASTC_6x5_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_6x6_Format = three.SRGB8_ALPHA8_ASTC_6x6_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_8x5_Format = three.SRGB8_ALPHA8_ASTC_8x5_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_8x6_Format = three.SRGB8_ALPHA8_ASTC_8x6_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_8x8_Format = three.SRGB8_ALPHA8_ASTC_8x8_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_10x5_Format = three.SRGB8_ALPHA8_ASTC_10x5_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_10x6_Format = three.SRGB8_ALPHA8_ASTC_10x6_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_10x8_Format = three.SRGB8_ALPHA8_ASTC_10x8_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_10x10_Format = three.SRGB8_ALPHA8_ASTC_10x10_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_12x10_Format = three.SRGB8_ALPHA8_ASTC_12x10_Format.valueOf(),
  SRGB8_ALPHA8_ASTC_12x12_Format = three.SRGB8_ALPHA8_ASTC_12x12_Format.valueOf(),

  // BPTC compressed texture formats
  RGBA_BPTC_Format = three.RGBA_BPTC_Format.valueOf()
}

// Loop styles for AnimationAction
export enum AnimationActionLoopStyles {
  LoopOnce = three.LoopOnce.valueOf(),
  LoopRepeat = three.LoopRepeat.valueOf(),
  LoopPingPong = three.LoopPingPong.valueOf()
}

// Interpolation
export enum InterpolationModes {
  InterpolateDiscrete = three.InterpolateDiscrete.valueOf(),
  InterpolateLinear = three.InterpolateLinear.valueOf(),
  InterpolateSmooth = three.InterpolateSmooth.valueOf()
}

// Interpolant ending modes
export enum InterpolationEndingModes {
  ZeroCurvatureEnding = three.ZeroCurvatureEnding.valueOf(),
  ZeroSlopeEnding = three.ZeroSlopeEnding.valueOf(),
  WrapAroundEnding = three.WrapAroundEnding.valueOf()
}

// Animation blending modes
export enum AnimationBlendMode {
  NormalAnimationBlendMode = three.NormalAnimationBlendMode.valueOf(),
  AdditiveAnimationBlendMode = three.AdditiveAnimationBlendMode.valueOf()
}

// Triangle Draw modes
export enum TrianglesDrawModes {
  TrianglesDrawMode = three.TrianglesDrawMode.valueOf(),
  TriangleStripDrawMode = three.TriangleStripDrawMode.valueOf(),
  TriangleFanDrawMode = three.TriangleFanDrawMode.valueOf()
}

// Texture Encodings
export enum TextureEncoding {
  LinearEncoding = three.LinearEncoding.valueOf(),
  sRGBEncoding = three.sRGBEncoding.valueOf(),
  GammaEncoding = three.GammaEncoding.valueOf(),
  RGBEEncoding = three.RGBEEncoding.valueOf(),
  LogLuvEncoding = three.LogLuvEncoding.valueOf(),
  RGBM7Encoding = three.RGBM7Encoding.valueOf(),
  RGBM16Encoding = three.RGBM16Encoding.valueOf(),
  RGBDEncoding = three.RGBDEncoding.valueOf()
}

// Depth packing strategies
export enum DepthPackingStrategies {
  BasicDepthPacking = three.BasicDepthPacking.valueOf(),
  RGBADepthPacking = three.RGBADepthPacking.valueOf()
}

// Normal Map types
export enum NormalMapTypes {
  TangentSpaceNormalMap = three.TangentSpaceNormalMap.valueOf(),
  ObjectSpaceNormalMap = three.ObjectSpaceNormalMap.valueOf()
}

// Stencil Op types
export enum StencilOp {
  ZeroStencilOp = three.ZeroStencilOp.valueOf(),
  KeepStencilOp = three.KeepStencilOp.valueOf(),
  ReplaceStencilOp = three.ReplaceStencilOp.valueOf(),
  IncrementStencilOp = three.IncrementStencilOp.valueOf(),
  DecrementStencilOp = three.DecrementStencilOp.valueOf(),
  IncrementWrapStencilOp = three.IncrementWrapStencilOp.valueOf(),
  DecrementWrapStencilOp = three.DecrementWrapStencilOp.valueOf(),
  InvertStencilOp = three.InvertStencilOp.valueOf()
}

// Stencil Func types
export enum StencilFunc {
  NeverStencilFunc = three.NeverStencilFunc.valueOf(),
  LessStencilFunc = three.LessStencilFunc.valueOf(),
  EqualStencilFunc = three.EqualStencilFunc.valueOf(),
  LessEqualStencilFunc = three.LessEqualStencilFunc.valueOf(),
  GreaterStencilFunc = three.GreaterStencilFunc.valueOf(),
  NotEqualStencilFunc = three.NotEqualStencilFunc.valueOf(),
  GreaterEqualStencilFunc = three.GreaterEqualStencilFunc.valueOf(),
  AlwaysStencilFunc = three.AlwaysStencilFunc.valueOf()
}

// usage types
export enum Usage {
  StaticDrawUsage = three.StaticDrawUsage.valueOf(),
  DynamicDrawUsage = three.DynamicDrawUsage.valueOf(),
  StreamDrawUsage = three.StreamDrawUsage.valueOf(),
  StaticReadUsage = three.StaticReadUsage.valueOf(),
  DynamicReadUsage = three.DynamicReadUsage.valueOf(),
  StreamReadUsage = three.StreamReadUsage.valueOf(),
  StaticCopyUsage = three.StaticCopyUsage.valueOf(),
  DynamicCopyUsage = three.DynamicCopyUsage.valueOf(),
  StreamCopyUsage = three.StreamCopyUsage.valueOf()
}

export enum GLSLVersion {
  GLSL1 = three.GLSL1.valueOf(),
  GLSL3 = three.GLSL3.valueOf()
}

export type BuiltInShaderAttributeName = three.BuiltinShaderAttributeName
