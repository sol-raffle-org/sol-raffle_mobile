import React, { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { IconButton, IconButtonProps } from 'react-native-paper'
import { AppItemText } from './app-item-text'

type AppPaginationProps = {
  currentPage: number
  pageSize: number
  totalItems: number
  pageText?: string
  style?: StyleProp<ViewStyle>
  onPrev: () => void
  onNext: () => void
}

export const AppPagination = ({
  currentPage,
  pageSize,
  totalItems,
  pageText = 'items',
  style = {},
  onPrev,
  onNext,
}: AppPaginationProps) => {
  const firstIndex = (currentPage - 1) * pageSize + 1
  const lastIndex = Math.min(currentPage * pageSize, totalItems)

  const isPrevDisabled = currentPage <= 1
  const isNextDisabled = lastIndex >= totalItems

  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'flex-start', padding: 8 }, style]}
    >
      <PaginationButton
        icon="chevron-left"
        onPress={onPrev}
        disabled={isPrevDisabled}
        iconColor={isPrevDisabled ? '#9CA3AF' : '#FFFFFF'}
      />

      <PaginationButton
        icon="chevron-right"
        onPress={onNext}
        disabled={isNextDisabled}
        iconColor={isNextDisabled ? '#9CA3AF' : '#FFFFFF'}
      />

      <AppItemText color="#FFFFFF80">
        {firstIndex}-{lastIndex} {pageText}
      </AppItemText>
    </View>
  )
}

const PaginationButton: FC<IconButtonProps> = ({ style, ...props }) => (
  <IconButton
    style={[
      {
        width: 40,
        height: 40,
        borderRadius: 4,
        backgroundColor: '#FFFFFF0D',
      },
      style,
    ]}
    {...props}
  />
)
