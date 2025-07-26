import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'
import { AppItemText } from '../../app-item-text'
import { EditIcon } from '../../icons'

type AppTextInputProps = {
  label?: string
  value?: string
  onChangeText?: (text: string) => void
} & TextInputProps

export function ProfileTextInput({ value, label, onChangeText }: AppTextInputProps) {
  const [typingValue, setTypingValue] = useState(value || '')
  const [isEdit, setIsEdit] = useState(false)

  const handleButtonClick = () => {
    setIsEdit(!isEdit)
    if (onChangeText && isEdit) onChangeText(typingValue)
  }

  const editColor = isEdit ? '#FFD600' : '#B0B0B0'
  const borderColor = isEdit ? '#FFD600' : '#ffffff1a'
  const visibleEdit = Boolean(onChangeText)

  return (
    <View
      style={{
        gap: 8,
      }}
    >
      {label && (
        <AppItemText textType="title" style={{ color: editColor, textAlign: 'left' }}>
          {label}
        </AppItemText>
      )}

      <TextInput
        mode="outlined"
        value={typingValue}
        onChangeText={setTypingValue}
        editable={isEdit}
        placeholder="Your Name"
        style={{
          backgroundColor: 'transparent',
          paddingRight: 36,
        }}
        outlineStyle={{
          borderRadius: 10,
          borderColor: borderColor,
          borderWidth: 2,
        }}
        right={
          visibleEdit && (
            <TextInput.Icon
              style={[{ marginLeft: 8 }, isEdit && { width: 80, marginLeft: -20 }]}
              icon={() =>
                isEdit ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: '#FFFFFF1A',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                    }}
                  >
                    <MaterialCommunityIcons name="check-circle" size={16} color="#FFFFFFB2" />

                    <AppItemText textType="title" style={{ fontSize: 12 }}>
                      Save
                    </AppItemText>
                  </View>
                ) : (
                  <EditIcon color="#fff" />
                )
              }
              onPress={handleButtonClick}
            />
          )
        }
      />
    </View>
  )
}
