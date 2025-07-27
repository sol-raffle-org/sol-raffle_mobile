import { AppDetailHeader } from '@/components/app-detail-header'
import { AppPage } from '@/components/app-page'
import { LoadListIcon } from '@/components/icons'
import { ProfileInformation } from '@/components/profile/profile-information'
import { ProfileTabItem } from '@/components/profile/profile-tab-item'
import { ProfileTransaction } from '@/components/profile/profile-transaction'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

enum ProfileTab {
  information = 1,
  transaction = 2,
}
export default function Profile() {
  const [tabValue, setTabValue] = useState(ProfileTab.information)

  const handleChangeTab = (selectedTab: number) => () => {
    setTabValue(selectedTab)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <AppPage
        style={{
          flex: 1,
        }}
      >
        <AppDetailHeader title="Profile" />

        <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 16 }}>
          <ProfileTabItem
            renderIcon={(props) => <MaterialIcons name="account-box" size={24} {...props} />}
            text="Information"
            selected={tabValue === ProfileTab.information}
            onPress={handleChangeTab(ProfileTab.information)}
          />

          <ProfileTabItem
            renderIcon={(props) => <LoadListIcon name="account-box" {...props} />}
            iconName="help-circle-outline"
            text="Transactions"
            selected={tabValue === ProfileTab.transaction}
            onPress={handleChangeTab(ProfileTab.transaction)}
          />
        </View>

        {tabValue === ProfileTab.transaction ? <ProfileTransaction /> : <ProfileInformation />}
      </AppPage>
    </SafeAreaView>
  )
}
