import { SolanaLogo } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppItemText, AppItemTextProps } from '@/components/app-item-text'
import { truncateHash } from '@/utils/common.utils'
import { formatDateToUTCString, formatNumber } from '@/utils/format.utils'
import { FC } from 'react'
import { View, ViewProps } from 'react-native'
import { TransactionDataType } from '.'

export interface ProfileTransactionItemProps {
  transaction: TransactionDataType
}
export const ProfileTransactionItem: FC<ProfileTransactionItemProps> = ({ transaction, ...props }) => {
  const isWin = Boolean(transaction.status)

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF14',
        borderWidth: 1,
        borderColor: '#FFFFFF1A',
        overflow: 'hidden',
        gap: 16,
      }}
    >
      <RowView>
        <RowText textType="subtitle" color="#FFFFFF80">
          {truncateHash(transaction.txHash)}
        </RowText>
        <RowText textType="subtitle" color="#FFFFFF80">
          {formatDateToUTCString(transaction.date)}
        </RowText>
      </RowView>
      <RowView>
        <RowText textType="subtitle" color="#FFFFFF80">
          Deposit
        </RowText>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AppImage source={SolanaLogo} style={{ width: 21, height: 21 }} />

          <AppItemText textType="title"> {formatNumber(transaction.prize, 4)}</AppItemText>
        </View>
      </RowView>
      <RowView>
        <RowText textType="subtitle">Status</RowText>
        <RowText textType="subtitle" color={isWin ? '#76D638' : '#FFFFFF80'}>
          {isWin ? 'Win' : 'Completed'}
        </RowText>
      </RowView>
    </View>
  )
}

const RowView: FC<ViewProps> = ({ style = {}, ...props }) => (
  <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, style]} {...props} />
)

const RowText: FC<AppItemTextProps> = (props) => <AppItemText textType="subtitle" color="#FFFFFF80" {...props} />
