import { AppImage } from '@/components/app-image'
import React, { Fragment, useEffect, useState } from 'react'
import { View } from 'react-native'

const Confetti = () => {
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    setTimeout(() => setShowFirst(false), 4000)
  }, [showFirst])

  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 20, zIndex: 50 }}>
      {showFirst ? (
        <AppImage
          source={require('@/assets/lottie/lottie-confetti.gif')}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <Fragment />
      )}
    </View>
  )
}

export default Confetti
