import { useAppTheme } from '@/components/app-theme'
import { CoinFlipIcon, JackpotIcon, StatsIcon } from '@/components/icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_LIST = [
  { name: 'jackpot', icon: JackpotIcon, label: 'Jackpot' },
  { name: 'coin-flip', icon: CoinFlipIcon, label: 'CoinFlip' },
  { name: 'stats', icon: StatsIcon, label: 'Stats' },
]

export function AppTabBar({ state, descriptors, navigation }) {
  const { theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const currentRoute = state.routes[state.index].name

  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom + 16,
        left: 0,
        width: '100%',
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 8,
          backgroundColor: '#FFFFFF1A',
          paddingTop: 1,
        }}
      >
        <View
          style={{
            borderRadius: 9,
            backgroundColor: '#151515',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 6,
            gap: 6,
          }}
        >
          {TAB_LIST.map(({ name, icon: Icon, label }) => {
            const isFocused = currentRoute === name

            return (
              <TouchableOpacity
                key={name}
                onPress={() => navigation.navigate(name)}
                style={[
                  {
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                  },
                  isFocused && { backgroundColor: '#76D6370D' },
                ]}
              >
                <Icon color={isFocused ? theme.colors.primary : '#888'} width={20} height={20} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  )
}
