import { AppPagination } from '@/components/app-pagination'
import { AppView } from '@/components/app-view'
import useGetUserJackpotHistory from '@/hooks/game-hooks/jackpot-hooks/useGetUserJackpotHistory'
import useJackpotStore from '@/stores/useJackpotStore'
import { JackpotTransactionItemType } from '@/types/service.type'
import { useEffect, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { ProfileTransactionItem } from './profile-transtaction-item'

export function ProfileTransaction() {
  const { page, setPage, setTotalItems, totalItems, userJackpotHistory } = useJackpotStore()
  const { handleGetTransactionHistory } = useGetUserJackpotHistory()

  const transactions = useMemo(() => refactorData(userJackpotHistory), [userJackpotHistory])

  const handlePrevClick = () => {
    const nextPage = Math.max(1, page - 1)
    setPage(nextPage)
  }

  const handleNextClick = () => {
    const nextPage = page + 1
    setPage(nextPage)
  }

  useEffect(() => {
    if (!page) return

    handleGetTransactionHistory(page)
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      setPage(1)
      setTotalItems(0)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppView style={{ flex: 1, flexDirection: 'column' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexDirection: 'column', gap: 8 }}
      >
        {transactions.map((transaction, index) => (
          <ProfileTransactionItem key={index} transaction={transaction} />
        ))}
      </ScrollView>

      <AppPagination
        currentPage={page}
        pageSize={10}
        totalItems={totalItems}
        pageText="Transactions"
        onPrev={handlePrevClick}
        onNext={handleNextClick}
      />
    </AppView>
  )
}

const refactorData = (userJackpotHistory?: JackpotTransactionItemType[]) => {
  if (!userJackpotHistory || !userJackpotHistory.length) return []

  const data = userJackpotHistory.map((item) => {
    return {
      id: item.id,
      prize: item.wagered,
      type: item.gameType,
      status: item.isWin,
      date: item.createdAt,
      txHash: item.tx,
    }
  })

  return data as TransactionDataType[]
}

export type TransactionDataType = {
  id: string
  prize: number
  type: string
  status: boolean
  date: string
  txHash: string
}
