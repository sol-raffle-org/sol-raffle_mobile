import { SolanaLogo } from '@/assets/images'
import React, { useEffect, useMemo, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { Button, TextInput, TextInputProps } from 'react-native-paper'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'
import { TrashIcon } from '../icons'

import { useToast } from '@/components/toast/app-toast-provider'
import { ERR_MSG_BET_BALANCE, MIN_BET_AMOUNT } from '@/constants/blockchain.const'
import useAccount from '@/hooks/account-hooks/useAccount'
import useTransaction from '@/hooks/blockchain-hooks'
import useJackpotGame from '@/hooks/game-hooks/jackpot-hooks/useJackpotGame'
import useAppStore from '@/stores/useAppStore'
import useJackpotStore from '@/stores/useJackpotStore'
import { BlockchainTransactionStatusEnum, SupportedChainEnum } from '@/types/common.type'
import { JackpotGameStatus } from '@/types/jackpot.type'
import { isNil } from '@/utils/common.utils'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

type JackpotAmountInputProps = {
  label?: string
  onChange?: (text: string) => void
} & TextInputProps

export function JackpotAmountInput({ onChange }: JackpotAmountInputProps) {
  const { showToast } = useToast()
  const { t } = useTranslation()
  const { handleGetBalance } = useAccount()
  const { jackpotGameData } = useJackpotStore()
  const { handleGetTransactionResult } = useTransaction()
  const { balance, setBalance, accountInfo } = useAppStore()
  const { transactionError, handleReset, handlePlaceBet } = useJackpotGame()

  const [typingValue, setTypingValue] = useState('')
  const [txHash, setTxHash] = useState('')
  const [isBetting, setIsBetting] = useState(false)
  const [txStatus, setTxStatus] = useState<BlockchainTransactionStatusEnum | undefined>(undefined)

  const handleClearClick = () => {
    setTypingValue('')
  }

  const disableBet = useMemo(() => {
    if (!jackpotGameData || !accountInfo) return true

    if (typingValue === '') return false

    const betTimes = jackpotGameData.bets.filter((item) => item.userInfo.wallet === accountInfo.wallet)

    const isNotMin = Number(typingValue || 0) < MIN_BET_AMOUNT
    const isCanBetStatus = [JackpotGameStatus.Pending, JackpotGameStatus.Playing, JackpotGameStatus.NotStart].includes(
      jackpotGameData?.status,
    )

    return (
      isBetting ||
      isNotMin ||
      !isCanBetStatus ||
      !balance ||
      betTimes?.length >= 5 ||
      Number(typingValue || 0) > balance - 0.0009
    )
  }, [isBetting, typingValue, jackpotGameData, accountInfo, balance])

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^0-9.,]/g, '')
    setTypingValue(filteredValue)
    if (onChange) onChange(filteredValue)
  }

  const handleBet = async () => {
    if (!accountInfo) return

    setTxHash('')
    setIsBetting(true)
    setTxStatus(undefined)

    const hash = await handlePlaceBet(accountInfo.wallet, Number(typingValue))

    if (hash) {
      setTxHash(hash)
      setBalance(Math.max(0, balance - Number(typingValue || 0)))
    }

    setIsBetting(false)
  }

  const handleGetTxStatus = async () => {
    if (!txHash) return

    const status = await handleGetTransactionResult(SupportedChainEnum.Solana, txHash)

    if (status === BlockchainTransactionStatusEnum.LOADING) return
    setTxStatus(status)

    if (status === BlockchainTransactionStatusEnum.SUCCESS) {
      handleGetBalance()
      setTxHash('')
    } else {
      showToast({ type: 'error', title: 'Bet Failed' })

      setTxHash('')
    }
  }

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

  useEffect(() => {
    if (!transactionError) return

    if (transactionError === ERR_MSG_BET_BALANCE) {
      showToast({ type: 'error', title: t('msgNotEnoughBalance') })
      handleGetBalance()
    } else {
      showToast({ type: 'error', title: t('msgTransactionFailed') })
    }

    handleReset()
  }, [transactionError, jackpotGameData, typingValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppView>
      <View
        style={{
          gap: 8,
        }}
      >
        <AppItemText textType="title" style={{ color: '#FFFFFF80', textAlign: 'left', fontSize: 12 }}>
          Ballance: {balance || 0}
        </AppItemText>

        <TextInput
          mode="outlined"
          inputMode="decimal"
          value={typingValue}
          onChangeText={handleChange}
          placeholder="Bet amount..."
          style={{
            backgroundColor: 'transparent',
            paddingRight: 36,
          }}
          outlineStyle={{
            borderRadius: 10,
            borderColor: '#ffffff1a',
            borderWidth: 2,
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
          right={
            <TextInput.Icon
              style={{
                width: 37,
                height: 30,
                borderRadius: 8,
                backgroundColor: '#FFFFFF1A',
              }}
              icon={() => <TrashIcon color="#FFFFFF66" />}
              onPress={handleClearClick}
              onTouchEnd={(e) => {
                e.stopPropagation()
              }}
            />
          }
        />
      </View>
      <PlaceBet
        onChangeValue={handleChange}
        onBetClick={handleBet}
        value={typingValue}
        balance={balance || 0}
        disableBet={disableBet}
      />
    </AppView>
  )
}

type PlaceBetProps = {
  value: string
  balance: number
  disableBet: boolean
  onChangeValue: (value: string) => void
  onBetClick: () => void
}
const PlaceBet = ({ value, balance, disableBet, onChangeValue, onBetClick }: PlaceBetProps) => {
  const autoBetData = ['0.1', '0.5', '1']

  const handleHotAdd = (hotValue: number) => {
    const dotIndex = value.indexOf('.')

    if (!value) {
      const newValue = String(hotValue.toFixed(3)).slice(0, dotIndex + 4)

      if (balance && Number(newValue) >= balance) {
        onChangeValue(String(balance - 0.0009).slice(0, dotIndex + 4))
      } else {
        onChangeValue(newValue)
      }
      onChangeValue(newValue)
    } else {
      const newValue = (Number(value) + hotValue).toFixed(3).slice(0, dotIndex + 4)
      if (balance && Number(newValue) >= balance) {
        onChangeValue(String(balance - 0.0009).slice(0, dotIndex + 4))
      } else {
        onChangeValue(newValue)
      }
    }
  }

  return (
    <AppView
      style={{
        gap: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {autoBetData.map((item) => (
        <BetButton key={item} title={`+${item}`} onPress={() => handleHotAdd(Number(item))} />
      ))}

      <PlaceBetButton onPress={onBetClick} disabled={disableBet} />
    </AppView>
  )
}

interface BetButtonProps {
  title?: string
  style?: ViewStyle
  contentStyle?: ViewStyle
  onPress: () => void
}
export function BetButton({ style, contentStyle, title, onPress }: BetButtonProps) {
  return (
    <Button
      dark
      mode="contained"
      onPress={onPress}
      style={[
        {
          backgroundColor: 'transparent',
          borderRadius: 10,
        },
        style,
      ]}
      contentStyle={[
        {
          backgroundColor: '#FFFFFF1F',
          borderRadius: 10,
        },
        contentStyle,
      ]}
    >
      <AppItemText style={{ color: '#fff' }}>{title}</AppItemText>
    </Button>
  )
}

export function PlaceBetButton({
  title = 'Place Bet',
  style,
  onPress,
  disabled,
}: {
  title?: string
  style?: ViewStyle
  disabled: boolean
  onPress: () => void
}) {
  const borderRadius = 8

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255)', 'rgba(255, 255, 255, 0.68)', 'rgba(255, 255, 255, 0.5)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        borderRadius: 10,
        padding: 2,
        ...style,
      }}
    >
      <LinearGradient
        colors={['#B7CA49', '#508031']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          borderRadius: borderRadius,
        }}
      >
        <Button
          dark
          mode="contained"
          onPress={onPress}
          style={{
            backgroundColor: 'transparent',
            borderRadius: borderRadius,
          }}
          disabled={disabled}
        >
          <AppItemText style={{ color: '#fff' }}>{title}</AppItemText>
        </Button>
      </LinearGradient>
    </LinearGradient>
  )
}
