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

export class TextureDataType extends Number {
  private static unsignedByteType = new TextureDataType(three.UnsignedByteType)
  static get UnsignedByteType() { return TextureDataType.unsignedByteType }
  private static byteType = new TextureDataType(three.ByteType)
  static get ByteType() { return TextureDataType.byteType }
  private static shortType = new TextureDataType(three.ShortType)
  static get ShortType() { return TextureDataType.shortType }
  private static unsignedShortType = new TextureDataType(three.UnsignedShortType)
  static get UnsignedShortType() { return TextureDataType.unsignedShortType }
  private static intType = new TextureDataType(three.IntType)
  static get IntType() { return TextureDataType.intType }
  private static unsignedIntType = new TextureDataType(three.UnsignedIntType)
  static get UnsignedIntType() { return TextureDataType.unsignedIntType }
  private static floatType = new TextureDataType(three.FloatType)
  static get FloatType() { return TextureDataType.floatType }
  private static halfFloatType = new TextureDataType(three.HalfFloatType)
  static get HalfFloatType() { return TextureDataType.halfFloatType }
  private static unsignedShort4444Type = new TextureDataType(three.UnsignedShort4444Type)
  static get UnsignedShort4444Type() { return TextureDataType.unsignedShort4444Type }
  private static unsignedShort5551Type = new TextureDataType(three.UnsignedShort5551Type)
  static get UnsignedShort5551Type() { return TextureDataType.unsignedShort5551Type }
  private static unsignedShort565Type = new TextureDataType(three.UnsignedShort565Type)
  static get UnsignedShort565Type() { return TextureDataType.unsignedShort565Type }
  private static unsignedInt248Type = new TextureDataType(three.UnsignedInt248Type)
  static get UnsignedInt248Type() { return TextureDataType.unsignedInt248Type }
}

export class PixelFormat extends Number {
  private static alphaFormat = new PixelFormat(three.AlphaFormat)
  static get AlphaFormat() { return PixelFormat.alphaFormat }
  private static rgbFormat = new PixelFormat(three.RGBFormat)
  static get RgbFormat() { return PixelFormat.rgbFormat }
  private static rgbaFormat = new PixelFormat(three.RGBAFormat)
  static get RgbaFormat() { return PixelFormat.rgbaFormat }
  private static luminanceFormat = new PixelFormat(three.LuminanceFormat)
  static get LuminanceFormat() { return PixelFormat.luminanceFormat }
  private static luminanceAlphaFormat = new PixelFormat(three.LuminanceAlphaFormat)
  static get LuminanceAlphaFormat() { return PixelFormat.luminanceAlphaFormat }
  private static rgbeFormat = new PixelFormat(three.RGBEFormat)
  static get RgbeFormat() { return PixelFormat.rgbeFormat }
  private static depthFormat = new PixelFormat(three.DepthFormat)
  static get DepthFormat() { return PixelFormat.depthFormat }
  private static depthStencilFormat = new PixelFormat(three.DepthStencilFormat)
  static get DepthStencilFormat() { return PixelFormat.depthStencilFormat }
  private static redFormat = new PixelFormat(three.RedFormat)
  static get RedFormat() { return PixelFormat.redFormat }
  private static redIntegerFormat = new PixelFormat(three.RedIntegerFormat)
  static get RedIntegerFormat() { return PixelFormat.redIntegerFormat }
  private static rgFormat = new PixelFormat(three.RGFormat)
  static get RgFormat() { return PixelFormat.rgFormat }
  private static rgIntegerFormat = new PixelFormat(three.RGIntegerFormat)
  static get RgIntegerFormat() { return PixelFormat.rgIntegerFormat }
  private static rgbIntegerFormat = new PixelFormat(three.RGBIntegerFormat)
  static get RgbIntegerFormat() { return PixelFormat.rgbIntegerFormat }
  private static rgbaIntegerFormat = new PixelFormat(three.RGBAIntegerFormat)
  static get RgbaIntegerFormat() { return PixelFormat.rgbaIntegerFormat }
}

// TODO: What is type PixelFormatGPU?
export type PixelFormatGpu = three.PixelFormatGPU


// TODO: Correct capitalization inside class CompressedPixelFormat.
export class CompressedPixelFormat extends Number {
  private static rgbS3tcDxt1Format = new CompressedPixelFormat(three.RGB_S3TC_DXT1_Format)
  static get RgbS3tcDxt1Format() { return CompressedPixelFormat.rgbS3tcDxt1Format }
  private static rGBA_S3TC_DXT1_Format = new CompressedPixelFormat(three.RGBA_S3TC_DXT1_Format)
  static get RGBA_S3TC_DXT1_Format() { return CompressedPixelFormat.rGBA_S3TC_DXT1_Format }
  private static rGBA_S3TC_DXT3_Format = new CompressedPixelFormat(three.RGBA_S3TC_DXT3_Format)
  static get RGBA_S3TC_DXT3_Format() { return CompressedPixelFormat.rGBA_S3TC_DXT3_Format }
  private static rGBA_S3TC_DXT5_Format = new CompressedPixelFormat(three.RGBA_S3TC_DXT5_Format)
  static get RGBA_S3TC_DXT5_Format() { return CompressedPixelFormat.rGBA_S3TC_DXT5_Format }

  private static rGB_PVRTC_4BPPV1_Format = new CompressedPixelFormat(three.RGB_PVRTC_4BPPV1_Format)
  static get RGB_PVRTC_4BPPV1_Format() { return CompressedPixelFormat.rGB_PVRTC_4BPPV1_Format }
  private static rGB_PVRTC_2BPPV1_Format = new CompressedPixelFormat(three.RGB_PVRTC_2BPPV1_Format)
  static get RGB_PVRTC_2BPPV1_Format() { return CompressedPixelFormat.rGB_PVRTC_2BPPV1_Format }
  private static rGBA_PVRTC_4BPPV1_Format = new CompressedPixelFormat(three.RGBA_PVRTC_4BPPV1_Format)
  static get RGBA_PVRTC_4BPPV1_Format() { return CompressedPixelFormat.rGBA_PVRTC_4BPPV1_Format }
  private static rGBA_PVRTC_2BPPV1_Format = new CompressedPixelFormat(three.RGBA_PVRTC_2BPPV1_Format)
  static get RGBA_PVRTC_2BPPV1_Format() { return CompressedPixelFormat.rGBA_PVRTC_2BPPV1_Format }

  private static rGB_ETC1_Format = new CompressedPixelFormat(three.RGB_ETC1_Format)
  static get RGB_ETC1_Format() { return CompressedPixelFormat.rGB_ETC1_Format }
  private static rGB_ETC2_Format = new CompressedPixelFormat(three.RGB_ETC2_Format)
  static get RGB_ETC2_Format() { return CompressedPixelFormat.rGB_ETC2_Format }
  private static rGBA_ETC2_EAC_Format = new CompressedPixelFormat(three.RGBA_ETC2_EAC_Format)
  static get RGBA_ETC2_EAC_Format() { return CompressedPixelFormat.rGBA_ETC2_EAC_Format }

  private static rGBA_ASTC_4x4_Format = new CompressedPixelFormat(three.RGBA_ASTC_4x4_Format)
  static get RGBA_ASTC_4x4_Format() { return CompressedPixelFormat.rGBA_ASTC_4x4_Format }
  private static rGBA_ASTC_5x4_Format = new CompressedPixelFormat(three.RGBA_ASTC_5x4_Format)
  static get RGBA_ASTC_5x4_Format() { return CompressedPixelFormat.rGBA_ASTC_5x4_Format }
  private static rGBA_ASTC_5x5_Format = new CompressedPixelFormat(three.RGBA_ASTC_5x5_Format)
  static get RGBA_ASTC_5x5_Format() { return CompressedPixelFormat.rGBA_ASTC_5x5_Format }
  private static rGBA_ASTC_6x5_Format = new CompressedPixelFormat(three.RGBA_ASTC_6x5_Format)
  static get RGBA_ASTC_6x5_Format() { return CompressedPixelFormat.rGBA_ASTC_6x5_Format }
  private static rGBA_ASTC_6x6_Format = new CompressedPixelFormat(three.RGBA_ASTC_6x6_Format)
  static get RGBA_ASTC_6x6_Format() { return CompressedPixelFormat.rGBA_ASTC_6x6_Format }
  private static rGBA_ASTC_8x5_Format = new CompressedPixelFormat(three.RGBA_ASTC_8x5_Format)
  static get RGBA_ASTC_8x5_Format() { return CompressedPixelFormat.rGBA_ASTC_8x5_Format }
  private static rGBA_ASTC_8x6_Format = new CompressedPixelFormat(three.RGBA_ASTC_8x6_Format)
  static get RGBA_ASTC_8x6_Format() { return CompressedPixelFormat.rGBA_ASTC_8x6_Format }
  private static rGBA_ASTC_8x8_Format = new CompressedPixelFormat(three.RGBA_ASTC_8x8_Format)
  static get RGBA_ASTC_8x8_Format() { return CompressedPixelFormat.rGBA_ASTC_8x8_Format }
  private static rGBA_ASTC_10x5_Format = new CompressedPixelFormat(three.RGBA_ASTC_10x5_Format)
  static get RGBA_ASTC_10x5_Format() { return CompressedPixelFormat.rGBA_ASTC_10x5_Format }
  private static rGBA_ASTC_10x6_Format = new CompressedPixelFormat(three.RGBA_ASTC_10x6_Format)
  static get RGBA_ASTC_10x6_Format() { return CompressedPixelFormat.rGBA_ASTC_10x6_Format }
  private static rGBA_ASTC_10x8_Format = new CompressedPixelFormat(three.RGBA_ASTC_10x8_Format)
  static get RGBA_ASTC_10x8_Format() { return CompressedPixelFormat.rGBA_ASTC_10x8_Format }
  private static rGBA_ASTC_10x10_Format = new CompressedPixelFormat(three.RGBA_ASTC_10x10_Format)
  static get RGBA_ASTC_10x10_Format() { return CompressedPixelFormat.rGBA_ASTC_10x10_Format }
  private static rGBA_ASTC_12x10_Format = new CompressedPixelFormat(three.RGBA_ASTC_12x10_Format)
  static get RGBA_ASTC_12x10_Format() { return CompressedPixelFormat.rGBA_ASTC_12x10_Format }
  private static rGBA_ASTC_12x12_Format = new CompressedPixelFormat(three.RGBA_ASTC_12x12_Format)
  static get RGBA_ASTC_12x12_Format() { return CompressedPixelFormat.rGBA_ASTC_12x12_Format }
  private static sRGB8_ALPHA8_ASTC_4x4_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_4x4_Format)
  static get SRGB8_ALPHA8_ASTC_4x4_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_4x4_Format }
  private static sRGB8_ALPHA8_ASTC_5x4_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_5x4_Format)
  static get SRGB8_ALPHA8_ASTC_5x4_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_5x4_Format }
  private static sRGB8_ALPHA8_ASTC_5x5_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_5x5_Format)
  static get SRGB8_ALPHA8_ASTC_5x5_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_5x5_Format }
  private static sRGB8_ALPHA8_ASTC_6x5_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_6x5_Format)
  static get SRGB8_ALPHA8_ASTC_6x5_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_6x5_Format }
  private static sRGB8_ALPHA8_ASTC_6x6_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_6x6_Format)
  static get SRGB8_ALPHA8_ASTC_6x6_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_6x6_Format }
  private static sRGB8_ALPHA8_ASTC_8x5_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_8x5_Format)
  static get SRGB8_ALPHA8_ASTC_8x5_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_8x5_Format }
  private static sRGB8_ALPHA8_ASTC_8x6_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_8x6_Format)
  static get SRGB8_ALPHA8_ASTC_8x6_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_8x6_Format }
  private static sRGB8_ALPHA8_ASTC_8x8_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_8x8_Format)
  static get SRGB8_ALPHA8_ASTC_8x8_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_8x8_Format }
  private static sRGB8_ALPHA8_ASTC_10x5_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_10x5_Format)
  static get SRGB8_ALPHA8_ASTC_10x5_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_10x5_Format }
  private static sRGB8_ALPHA8_ASTC_10x6_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_10x6_Format)
  static get SRGB8_ALPHA8_ASTC_10x6_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_10x6_Format }
  private static sRGB8_ALPHA8_ASTC_10x8_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_10x8_Format)
  static get SRGB8_ALPHA8_ASTC_10x8_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_10x8_Format }
  private static sRGB8_ALPHA8_ASTC_10x10_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_10x10_Format)
  static get SRGB8_ALPHA8_ASTC_10x10_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_10x10_Format }
  private static sRGB8_ALPHA8_ASTC_12x10_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_12x10_Format)
  static get SRGB8_ALPHA8_ASTC_12x10_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_12x10_Format }
  private static sRGB8_ALPHA8_ASTC_12x12_Format = new CompressedPixelFormat(three.SRGB8_ALPHA8_ASTC_12x12_Format)
  static get SRGB8_ALPHA8_ASTC_12x12_Format() { return CompressedPixelFormat.sRGB8_ALPHA8_ASTC_12x12_Format }

  private static rGBA_BPTC_Format = new CompressedPixelFormat(three.RGBA_BPTC_Format)
  static get RGBA_BPTC_Format() { return CompressedPixelFormat.rGBA_BPTC_Format }
}

export class AnimationActionLoopStyles extends Number {
  private static loopOnce = new AnimationActionLoopStyles(three.LoopOnce)
  static get LoopOnce() { return AnimationActionLoopStyles.loopOnce }
  private static loopRepeat = new AnimationActionLoopStyles(three.LoopRepeat)
  static get LoopRepeat() { return AnimationActionLoopStyles.loopRepeat }
  private static loopPingPong = new AnimationActionLoopStyles(three.LoopPingPong)
  static get LoopPingPong() { return AnimationActionLoopStyles.loopPingPong }
}

export class InterpolationModes extends Number {
  private static interpolateDiscrete = new InterpolationModes(three.InterpolateDiscrete)
  static get InterpolateDiscrete() { return InterpolationModes.interpolateDiscrete }
  private static interpolateLinear = new InterpolationModes(three.InterpolateLinear)
  static get InterpolateLinear() { return InterpolationModes.interpolateLinear }
  private static interpolateSmooth = new InterpolationModes(three.InterpolateSmooth)
  static get InterpolateSmooth() { return InterpolationModes.interpolateSmooth }
}

export class InterpolationEndingModes extends Number {
  private static zeroCurvatureEnding = new InterpolationEndingModes(three.ZeroCurvatureEnding)
  static get ZeroCurvatureEnding() { return InterpolationEndingModes.zeroCurvatureEnding }
  private static zeroSlopeEnding = new InterpolationEndingModes(three.ZeroSlopeEnding)
  static get ZeroSlopeEnding() { return InterpolationEndingModes.zeroSlopeEnding }
  private static wrapAroundEnding = new InterpolationEndingModes(three.WrapAroundEnding)
  static get WrapAroundEnding() { return InterpolationEndingModes.wrapAroundEnding }
}

export class AnimationBlendMode extends Number {
  private static normalAnimationBlendMode = new AnimationBlendMode(three.NormalAnimationBlendMode)
  static get NormalAnimationBlendMode() { return AnimationBlendMode.normalAnimationBlendMode }
  private static additiveAnimationBlendMode = new AnimationBlendMode(three.AdditiveAnimationBlendMode)
  static get AdditiveAnimationBlendMode() { return AnimationBlendMode.additiveAnimationBlendMode }
}

export class TrianglesDrawModes extends Number {
  private static trianglesDrawMode = new TrianglesDrawModes(three.TrianglesDrawMode)
  static get TrianglesDrawMode() { return TrianglesDrawModes.trianglesDrawMode }
  private static triangleStripDrawMode = new TrianglesDrawModes(three.TriangleStripDrawMode)
  static get TriangleStripDrawMode() { return TrianglesDrawModes.triangleStripDrawMode }
  private static triangleFanDrawMode = new TrianglesDrawModes(three.TriangleFanDrawMode)
  static get TriangleFanDrawMode() { return TrianglesDrawModes.triangleFanDrawMode }
}

export class TextureEncoding extends Number {
  private static linearEncoding = new TextureEncoding(three.LinearEncoding)
  static get LinearEncoding() { return TextureEncoding.linearEncoding }
  private static srgbEncoding = new TextureEncoding(three.sRGBEncoding)
  static get SrgbEncoding() { return TextureEncoding.srgbEncoding }
  private static gammaEncoding = new TextureEncoding(three.GammaEncoding)
  static get GammaEncoding() { return TextureEncoding.gammaEncoding }
  private static rgbeEncoding = new TextureEncoding(three.RGBEEncoding)
  static get RgbeEncoding() { return TextureEncoding.rgbeEncoding }
  private static logLuvEncoding = new TextureEncoding(three.LogLuvEncoding)
  static get LogLuvEncoding() { return TextureEncoding.logLuvEncoding }
  private static rgbm7Encoding = new TextureEncoding(three.RGBM7Encoding)
  static get Rgbm7Encoding() { return TextureEncoding.rgbm7Encoding }
  private static rgbm16Encoding = new TextureEncoding(three.RGBM16Encoding)
  static get Rgbm16Encoding() { return TextureEncoding.rgbm16Encoding }
  private static rgbdEncoding = new TextureEncoding(three.RGBDEncoding)
  static get RgbdEncoding() { return TextureEncoding.rgbdEncoding }
}

export class DepthPackingStrategies extends Number {
  private static basicDepthPacking = new DepthPackingStrategies(three.BasicDepthPacking)
  static get BasicDepthPacking() { return DepthPackingStrategies.basicDepthPacking }
  private static rgbaDepthPacking = new DepthPackingStrategies(three.RGBADepthPacking)
  static get RgbaDepthPacking() { return DepthPackingStrategies.rgbaDepthPacking }
}

export class NormalMapTypes extends Number {
  private static tangentSpaceNormalMap = new NormalMapTypes(three.TangentSpaceNormalMap)
  static get TangentSpaceNormalMap() { return NormalMapTypes.tangentSpaceNormalMap }
  private static objectSpaceNormalMap = new NormalMapTypes(three.ObjectSpaceNormalMap)
  static get ObjectSpaceNormalMap() { return NormalMapTypes.objectSpaceNormalMap }
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
  private static neverStencilFunc = new StencilFunc(three.NeverStencilFunc)
  static get NeverStencilFunc() { return StencilFunc.neverStencilFunc }
  private static lessStencilFunc = new StencilFunc(three.LessStencilFunc)
  static get LessStencilFunc() { return StencilFunc.lessStencilFunc }
  private static equalStencilFunc = new StencilFunc(three.EqualStencilFunc)
  static get EqualStencilFunc() { return StencilFunc.equalStencilFunc }
  private static lessEqualStencilFunc = new StencilFunc(three.LessEqualStencilFunc)
  static get LessEqualStencilFunc() { return StencilFunc.lessEqualStencilFunc }
  private static greaterStencilFunc = new StencilFunc(three.GreaterStencilFunc)
  static get GreaterStencilFunc() { return StencilFunc.greaterStencilFunc }
  private static notEqualStencilFunc = new StencilFunc(three.NotEqualStencilFunc)
  static get NotEqualStencilFunc() { return StencilFunc.notEqualStencilFunc }
  private static greaterEqualStencilFunc = new StencilFunc(three.GreaterEqualStencilFunc)
  static get GreaterEqualStencilFunc() { return StencilFunc.greaterEqualStencilFunc }
  private static alwaysStencilFunc = new StencilFunc(three.AlwaysStencilFunc)
  static get AlwaysStencilFunc() { return StencilFunc.alwaysStencilFunc }
}

export class Usage extends Number {
  private static staticDrawUsage = new Usage(three.StaticDrawUsage)
  static get StaticDrawUsage() { return Usage.staticDrawUsage }
  private static dynamicDrawUsage = new Usage(three.DynamicDrawUsage)
  static get DynamicDrawUsage() { return Usage.dynamicDrawUsage }
  private static streamDrawUsage = new Usage(three.StreamDrawUsage)
  static get StreamDrawUsage() { return Usage.streamDrawUsage }
  private static staticReadUsage = new Usage(three.StaticReadUsage)
  static get StaticReadUsage() { return Usage.staticReadUsage }
  private static dynamicReadUsage = new Usage(three.DynamicReadUsage)
  static get DynamicReadUsage() { return Usage.dynamicReadUsage }
  private static streamReadUsage = new Usage(three.StreamReadUsage)
  static get StreamReadUsage() { return Usage.streamReadUsage }
  private static staticCopyUsage = new Usage(three.StaticCopyUsage)
  static get StaticCopyUsage() { return Usage.staticCopyUsage }
  private static dynamicCopyUsage = new Usage(three.DynamicCopyUsage)
  static get DynamicCopyUsage() { return Usage.dynamicCopyUsage }
  private static streamCopyUsage = new Usage(three.StreamCopyUsage)
  static get StreamCopyUsage() { return Usage.streamCopyUsage }
}

export class GlslVersion extends Number {
  private static glsl1 = new GlslVersion(three.GLSL1)
  static get Glsl1() { return GlslVersion.glsl1 }
  private static glsl3 = new GlslVersion(three.GLSL3)
  static get Glsl3() { return GlslVersion.glsl3 }
}

// TODO: What is type BuiltInShaderAttributeName?
export type BuiltInShaderAttributeName = three.BuiltinShaderAttributeName
