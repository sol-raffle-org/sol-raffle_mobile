import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import { ERR_MSG_BET_BALANCE } from '@/constants/blockchain.const'
import useAccount from '@/hooks/account-hooks/useAccount'
import useTransaction from '@/hooks/blockchain-hooks'
import useCoinFlipGame from '@/hooks/game-hooks/coin-flip-hooks/useCoinFlipGame'
import useAppStore from '@/stores/useAppStore'
import { CoinSideEnum } from '@/types/coin-flip.type'
import { BlockchainTransactionStatusEnum, SupportedChainEnum } from '@/types/common.type'
import { isNil } from '@/utils/common.utils'
import { formatNumber } from '@/utils/format.utils'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { AppButton } from '../app-button'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'
import { useToast } from '../toast/app-toast-provider'

export function CoinFlipCreateGame() {
  const { balance } = useAppStore()
  const [typingValue, setTypingValue] = useState('')

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^0-9.,]/g, '')
    setTypingValue(filteredValue)
  }

  return (
    <AppView
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#76D63733',
        borderRadius: 4,
        padding: 16,
        gap: 8,
      }}
    >
      <CoinFlipAmount value={typingValue} onChange={handleChange} />
      <AppItemText
        textType="subtitle"
        style={{
          fontSize: 12,
          color: '#FFFFFF66',
        }}
      >
        Balance: {formatNumber(balance)} SOL
      </AppItemText>

      <CoinFlipSide value={typingValue} />
    </AppView>
  )
}

interface CoinFlipAmountProps {
  value: string
  onChange: (text: string) => void
}
const CoinFlipAmount = ({ value, onChange }: CoinFlipAmountProps) => {
  const autoBetData = ['0.1', '1']
  const { balance } = useAppStore()

  const handleHotAdd = (hotValue: number) => {
    const dotIndex = value.indexOf('.')

    if (!value) {
      const newValue = String(hotValue.toFixed(3)).slice(0, dotIndex + 4)

      if (balance && Number(newValue) >= balance) {
        onChange(String(balance - 0.0009).slice(0, dotIndex + 4))
      } else {
        onChange(newValue)
      }
      onChange(newValue)
    } else {
      const newValue = (Number(value) + hotValue).toFixed(3).slice(0, dotIndex + 4)
      if (balance && Number(newValue) >= balance) {
        onChange(String(balance - 0.0009).slice(0, dotIndex + 4))
      } else {
        onChange(newValue)
      }
    }
  }

  return (
    <AppView
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
      }}
    >
      <TextInput
        mode="outlined"
        inputMode="decimal"
        value={value}
        onChangeText={onChange}
        placeholder="Bet amount..."
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF1A',
          paddingRight: 36,
          height: 40,
        }}
        outlineStyle={{
          borderRadius: 2,
          borderColor: 'transparent',
        }}
        left={
          <TextInput.Icon
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#000',
            }}
            icon={() => <AppImage source={SolanaLogo} style={{ width: 28, height: 28 }} />}
          />
        }
      />

      {autoBetData.map((item) => (
        <Pressable
          key={item}
          onPress={() => handleHotAdd(Number(item))}
          style={({ pressed }) => [
            {
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: pressed ? '#FFFFFF33' : '#FFFFFF1A',
              justifyContent: 'center',
              alignItems: 'center',
            } as StyleProp<ViewStyle>,
          ]}
        >
          <AppItemText style={{ color: '#fff' }}>{`+${item}`}</AppItemText>
        </Pressable>
      ))}
    </AppView>
  )
}

const SIDE_IMAGE = [CoinHeadImage, CoinTailImage]
interface CoinFlipSideProps {
  value: string
}
const CoinFlipSide = ({ value }: CoinFlipSideProps) => {
  const { showToast } = useToast()
  const { handleGetBalance } = useAccount()
  const { handleGetTransactionResult } = useTransaction()
  const { accountInfo, balance, setBalance } = useAppStore()
  const { transactionError, handleReset, handleCreateNewFlipGame } = useCoinFlipGame()

  const [selectedIndex, setSelectedIndex] = useState(CoinSideEnum.Heads)
  const [isCreate, setIsCreate] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [txStatus, setTxStatus] = useState<BlockchainTransactionStatusEnum | undefined>(undefined)

  const handleCreateGame = async () => {
    if (!accountInfo) return

    setIsCreate(true)

    const hash = await handleCreateNewFlipGame(accountInfo.wallet, Number(value), selectedIndex)

    if (hash) {
      setBalance(Math.max(0, balance - Number(value || 0)))
      setTxHash(hash)
    }

    setIsCreate(false)
  }

  const handleGetTxStatus = async () => {
    if (!txHash) return

    const status = await handleGetTransactionResult(SupportedChainEnum.Solana, txHash)

    if (status === BlockchainTransactionStatusEnum.LOADING) return
    setTxStatus(status)

    if (status === BlockchainTransactionStatusEnum.SUCCESS) {
      setTxHash('')
    } else {
      showToast({ type: 'error', subtitle: 'Bet failed' })
      setTxHash('')
    }
  }

  useEffect(() => {
    if (!transactionError || !accountInfo) return

    if (transactionError === ERR_MSG_BET_BALANCE) {
      handleGetBalance()
      showToast({ type: 'error', subtitle: 'Not enough balance' })
    } else {
      showToast({ type: 'error', subtitle: 'Transaction failed' })
    }

    handleReset()
  }, [accountInfo, transactionError, value]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let getStatusInterval: any = undefined

    getStatusInterval = setInterval(async () => {
      handleGetTxStatus()
    }, 3000)

    if (!txHash || (!isNil(txStatus) && txStatus !== BlockchainTransactionStatusEnum.LOADING)) {
      clearInterval(getStatusInterval)
      return
    }

    return () => {
      clearInterval(getStatusInterval)
    }
  }, [txHash, txStatus]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <AppItemText>Side</AppItemText>
        {SIDE_IMAGE.map((imageSource, index) => (
          <IconButton
            key={index}
            icon={() => (
              <AppImage
                source={imageSource}
                style={[
                  { width: 40, height: 40, opacity: 0.5 },
                  selectedIndex === index && {
                    opacity: 1,
                  },
                ]}
              />
            )}
            onPress={() => setSelectedIndex(index)}
          />
        ))}
      </View>

      <AppButton
        style={{
          width: 105,
          height: 40,
        }}
        disabled={!Boolean(value) || isCreate}
        onPress={handleCreateGame}
      >
        <AppItemText>Create Game</AppItemText>
      </AppButton>
    </AppView>
  )
}
