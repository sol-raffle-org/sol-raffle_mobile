import { AppView } from '@/components/app-view'
import { JackpotPlayInRound } from '@/components/jackpot/jackpot-play-in-round'
import { JackpotSlotMachine } from '@/components/jackpot/jackpot-slot-machine'
import { JackpotSlotMachineAction } from '@/components/jackpot/jackpot-slot-machine-action'
import { ScrollView, View } from 'react-native'

export default function JackpotScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <JackpotSlotMachine />

      <AppView style={{ flex: 1, padding: 8 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexDirection: 'column', gap: 8 }}
        >
          <JackpotSlotMachineAction />

          <JackpotPlayInRound />
        </ScrollView>
      </AppView>
    </View>
  )
}
