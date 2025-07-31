import { Text as NativeText } from 'react-native'
import { Text, TextProps } from 'react-native-paper'

export function AppText({ style, ...otherProps }: TextProps<NativeText>) {
  return <Text style={[{ fontFamily: 'InriaSans-Regular' }, style]} {...otherProps} />
}
