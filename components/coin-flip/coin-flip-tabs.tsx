import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'

const TAB_MODE = {
  all: 'all',
  myGame: 'my-game',
}
export function CoinFlipTabs() {
  const [tabValue, setTabValue] = useState(TAB_MODE.all)

  const data = [
    {
      label: 'All Games',
      total: 300,
      value: TAB_MODE.all,
    },
    {
      label: 'My Games',
      total: 3,
      value: TAB_MODE.myGame,
    },
  ]

  return (
    <AppView
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#76D63733',
        borderRadius: 4,
        padding: 2,
        backgroundColor: '#000',
        gap: 0,
      }}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={[
            {
              height: 33,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              backgroundColor: '#255C2F66',
              padding: 8,
              opacity: 0.2,
            },
            tabValue === item.value && {
              opacity: 1,
            },
          ]}
          onPress={() => setTabValue(item.value)}
        >
          <AppItemText style={{ fontSize: 13 }}>{item.label} </AppItemText>
          <AppItemText color="#FAB40F">{item.total}</AppItemText>
        </TouchableOpacity>
      ))}
    </AppView>
  )
}
