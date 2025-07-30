import { AppButton } from '@/components/app-button'
import { AppCarousel } from '@/components/app-carousel'
import { useAuth } from '@/components/auth/auth-provider'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ConnectWallet() {
  const router = useRouter()
  const { isAuthenticated, connect, handleSignMessage, isConnected } = useAuth()
  const insets = useSafeAreaInsets()

  const handleConnectWallet = async () => {
    await connect()
    router.replace('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/') // Replace to avoid going back to login
    }
  }, [isAuthenticated, router])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fullContainer, styles.spaceContent]}>
        <AppCarousel
          data={data}
          renderItem={({ item }: { item: SlideItem }) => (
            <View style={carouselStyles.card}>
              <View style={styles.fullContainer}>
                <Image style={carouselStyles.cardImage} source={item.image} />
              </View>

              <View style={styles.spaceContent}>
                <Text style={carouselStyles.cardTitle}>{item.title}</Text>
                <Text style={carouselStyles.cardSubTitle}>
                  {item.subTitle.split('<br/>').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < item.subTitle.split('<br/>').length - 1 && <Text>{'\n'}</Text>}
                    </React.Fragment>
                  ))}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={[styles.buttonContainer]}>
        <View
          style={{
            backgroundColor: '#133018',
            paddingBottom: 3,
            borderRadius: 2,
          }}
        ></View>
        <AppButton
          title={isConnected ? 'Sign Message' : 'Connect Wallet Now'}
          disabled={true}
          style={{
            borderRadius: 2,
          }}
          onPress={() => {
            if (isConnected) {
              handleSignMessage()
            } else {
              handleConnectWallet()
            }
          }}
        />
      </View>
    </View>
  )
}

type SlideItem = {
  title: string
  subTitle: string
  image: ImageSourcePropType
}

const data: SlideItem[] = [
  {
    title: 'Jackpot',
    subTitle: 'Battle in out against other players <br/> to win the jackpot',
    image: require('@/assets/images/login/img-slider-1.png'),
  },
  {
    title: 'Coinflip',
    subTitle: 'The classic 50/50 game, toss the <br/> coin and cross your fingers!',
    image: require('@/assets/images/login/img-slider-2.png'),
  },
  {
    title: 'Create an Affiliate code and earn',
    subTitle: 'Earn 10% commision from the users you refer by <br/> creating an affiliate code and sharing it.',
    image: require('@/assets/images/login/img-slider-3.png'),
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullContainer: {
    flex: 1,
  },
  spaceContent: {
    justifyContent: 'center',
    gap: 8,
  },
  buttonContainer: {
    paddingTop: 56,
    paddingBottom: 36,
    paddingHorizontal: 16,
  },
})

const carouselStyles = StyleSheet.create({
  card: {
    flex: 1,
    paddingBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  cardSubTitle: {
    fontFamily: 'InriaSans-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
  },
})
