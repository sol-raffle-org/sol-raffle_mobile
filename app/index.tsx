import { Redirect } from 'expo-router'

export default function HomeScreen() {
  console.log('HomeScreen')

  return <Redirect href="/(tabs)/stats" />
}
