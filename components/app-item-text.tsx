import { Text as NativeText, StyleSheet } from 'react-native'
import { Text, TextProps } from 'react-native-paper'

export interface AppItemTextProps extends TextProps<NativeText> {
  textType?: 'title' | 'subtitle'
  color?: string
}

export function AppItemText({ textType, style, color = '#FFF', ...rest }: AppItemTextProps) {
  return (
    <Text style={[{ color }, styles.text, textType === 'subtitle' ? styles.subtitle : styles.title, style]} {...rest} />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'InriaSans-Regular',
    fontWeight: '400',
  },
  title: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: '700',
  },
})
