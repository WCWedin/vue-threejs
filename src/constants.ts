import * as three from 'three'

// TODO: These will have to be refactored into static classes to be easily used as Vue prop types.

export enum Mouse {
  Left = three.MOUSE.LEFT.valueOf(),
  Middle = three.MOUSE.MIDDLE.valueOf(),
  Right = three.MOUSE.RIGHT.valueOf(),
  Rotate = three.MOUSE.ROTATE.valueOf(),
  Dolly = three.MOUSE.DOLLY.valueOf(),
  Pan = three.MOUSE.PAN.valueOf()
}

export enum Touch {
  Rotate = three.TOUCH.ROTATE.valueOf(),
  Pan = three.TOUCH.PAN.valueOf(),
  DollyPan = three.TOUCH.DOLLY_PAN.valueOf(),
  DollyRotate = three.TOUCH.DOLLY_ROTATE.valueOf()
}

// GL STATE CONSTANTS
export enum CullFace {
  CullFaceNone = three.CullFaceNone.valueOf(),
  CullFaceBack = three.CullFaceBack.valueOf(),
  CullFaceFront = three.CullFaceFront.valueOf(),
  CullFaceFrontBack = three.CullFaceFrontBack.valueOf()
}

// Shadowing Type
export enum ShadowMapType {
  BasicShadowMap = three.BasicShadowMap.valueOf(),
  PCFShadowMap = three.PCFShadowMap.valueOf(),
  PCFSoftShadowMap = three.PCFSoftShadowMap.valueOf(),
  VSMShadowMap = three.VSMShadowMap.valueOf()
}

// TEXTURE CONSTANTS
export enum Combine {
  MultiplyOperation = three.MultiplyOperation.valueOf(),
  MixOperation = three.MixOperation.valueOf(),
  AddOperation = three.AddOperation.valueOf()
}

export enum ToneMapping {
  NoToneMapping = three.NoToneMapping.valueOf(),
  LinearToneMapping = three.LinearToneMapping.valueOf(),
  ReinhardToneMapping = three.ReinhardToneMapping.valueOf(),
  CineonToneMapping = three.CineonToneMapping.valueOf(),
  ACESFilmicToneMapping = three.ACESFilmicToneMapping.valueOf(),
  // TODO: This constant is missing from the binding, I think? Might need to make a PR.
  CustomToneMapping = 5
}

export enum Mapping {
  UVMapping = three.UVMapping.valueOf(),
  CubeReflectionMapping = three.CubeReflectionMapping.valueOf(),
  CubeRefractionMapping = three.CubeRefractionMapping.valueOf(),
  EquirectangularReflectionMapping = three.EquirectangularReflectionMapping.valueOf(),
  EquirectangularRefractionMapping = three.EquirectangularRefractionMapping.valueOf(),
  CubeUVReflectionMapping = three.CubeUVReflectionMapping.valueOf(),
  CubeUVRefractionMapping = three.CubeUVRefractionMapping.valueOf()
}

export enum Wrapping {
  RepeatWrapping = three.RepeatWrapping.valueOf(),
  ClampToEdgeWrapping = three.ClampToEdgeWrapping.valueOf(),
  MirroredRepeatWrapping = three.MirroredRepeatWrapping.valueOf()
}

export enum TextureFilter {
  NearestFilter = three.NearestFilter.valueOf(),
  NearestMipmapNearestFilter = three.NearestMipmapNearestFilter.valueOf(),
  NearestMipMapNearestFilter = three.NearestMipMapNearestFilter.valueOf(),
  NearestMipmapLinearFilter = three.NearestMipmapLinearFilter.valueOf(),
  NearestMipMapLinearFilter = three.NearestMipMapLinearFilter.valueOf(),
  LinearFilter = three.LinearFilter.valueOf(),
  LinearMipmapNearestFilter = three.LinearMipmapNearestFilter.valueOf(),
  LinearMipMapNearestFilter = three.LinearMipMapNearestFilter.valueOf(),
  LinearMipmapLinearFilter = three.LinearMipmapLinearFilter.valueOf(),
  LinearMipMapLinearFilter = three.LinearMipMapLinearFilter.valueOf()
}

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

export type BuiltinShaderAttributeName = three.BuiltinShaderAttributeName
