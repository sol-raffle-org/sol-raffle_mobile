import { AppItemText } from '@/components/app-item-text'
import type { IconName } from '@expo/vector-icons/build/Icons/Ionicons'
import { FC, ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

export interface ProfileTabItemProps extends TouchableOpacityProps {
  iconName?: IconName
  text: string
  selected?: boolean
  renderIcon?: (props: any) => ReactNode
}
export const ProfileTabItem: FC<ProfileTabItemProps> = ({ renderIcon, text, selected, ...props }) => {
  const color = selected ? '#76D638' : '#fff'

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          minWidth: 110,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 42,
          backgroundColor: '#171717',
        },
        selected && { backgroundColor: '#142608' },
        props.style,
      ]}
    >
      {renderIcon ? renderIcon({ color }) : null}

      <AppItemText
        textType="title"
        style={[
          {
            fontSize: 12,
            marginLeft: 8,
            color: '#fff',
          },
          selected && { color: color },
        ]}
      >
        {text}
      </AppItemText>
    </TouchableOpacity>
  )
}
