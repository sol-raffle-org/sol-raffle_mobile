import { Image, ImageProps } from 'expo-image'

export function AppImage({ ...rest }: ImageProps) {
  return <Image contentFit="cover" {...rest} />
}
