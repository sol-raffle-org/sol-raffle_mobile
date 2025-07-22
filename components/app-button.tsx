import { FC } from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

export interface CommonButtonProps extends PressableProps {
  variant?: 'contained' | 'text'
  children?: React.ReactNode
  title?: string
}

export const AppButton: FC<CommonButtonProps> = ({
  title,
  children,
  variant = 'contained',
  onPress,
  ...otherProps
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'contained' && styles.containedGreen,
        pressed && { opacity: 0.8 },
        otherProps.style, // Allow additional styles to be passed
      ]}
      {...otherProps}
    >
      {title && <Text style={[styles.text, variant === 'contained' && styles.containedText]}>{title}</Text>}
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,

    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
    paddingLeft: 8,
  },
  containedGreen: {
    backgroundColor: 'rgba(37, 92, 47, 1)',

    // Android Shadow
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  containedText: {
    opacity: 1,
  },
})
