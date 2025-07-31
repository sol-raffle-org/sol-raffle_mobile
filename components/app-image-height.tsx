import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageProps, ImageSourcePropType, ImageStyle, ImageURISource, StyleProp } from 'react-native'

interface AutoHeightImageProps extends ImageProps {
  source: ImageSourcePropType
  width?: number
  style?: StyleProp<ImageStyle>
}

export function AutoHeightImage({
  source,
  width = Dimensions.get('screen').width,
  style,
  ...otherProps
}: AutoHeightImageProps) {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (typeof source === 'number') {
      // Static image (require)
      const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(source)
      const ratio = imgHeight / imgWidth
      setHeight(width * ratio)
    } else if (typeof source === 'object' && 'uri' in source) {
      // Remote image (uri)
      Image.getSize(
        (source as ImageURISource).uri!,
        (w, h) => {
          const ratio = h / w
          setHeight(width * ratio)
        },
        (error) => {
          console.warn('Failed to get image size', error)
        },
      )
    }
  }, [source, width])

  return <Image source={source} style={[{ width, height }, style]} resizeMode="contain" {...otherProps} />
}
