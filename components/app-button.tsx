import { FC } from 'react'
import { Pressable, PressableProps, StyleSheet, View } from 'react-native'
import { AppItemText } from './app-item-text'

export interface CommonButtonProps extends PressableProps {
  variant?: 'contained' | 'text'
  children?: React.ReactNode
  title?: string
}

export const AppButton: FC<CommonButtonProps> = ({
  title,
  children,
  variant = 'contained',
  disabled,
  style,
  onPress,
  ...otherProps
}) => {
  return (
    <View>
      <View
        style={[
          variant === 'contained' && {
            backgroundColor: '#133018',
            paddingBottom: 3,
            borderRadius: 2,
          },
        ]}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.button,
            variant === 'contained' && styles.containedGreen,
            pressed && { opacity: 0.8 },
            style,
          ]}
          {...otherProps}
        >
          {title && (
            <AppItemText style={[styles.text, variant === 'contained' && styles.containedText]}>{title}</AppItemText>
          )}
          {children}
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 2,
  },
  containedGreen: {
    backgroundColor: 'rgba(37, 92, 47, 1)',
  },
  text: {
    color: '#fff',
    opacity: 0.5,
  },
  containedText: {
    opacity: 1,
  },
})
