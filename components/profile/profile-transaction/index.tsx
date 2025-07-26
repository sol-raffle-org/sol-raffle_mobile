import { AppPagination } from '@/components/app-pagination'
import { AppView } from '@/components/app-view'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { ProfileTransactionItem } from './profile-transtaction-item'

export function ProfileTransaction() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevClick = () => {
    const nextPage = Math.max(1, currentPage - 1)
    setCurrentPage(nextPage)
  }

  const handleNextClick = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
  }

  return (
    <AppView style={{ flex: 1, flexDirection: 'column' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexDirection: 'column', gap: 8 }}
      >
        {new Array(10).fill({}).map((transaction, index) => (
          <ProfileTransactionItem key={index} transaction={transaction} />
        ))}
      </ScrollView>

      <AppPagination
        currentPage={currentPage}
        pageSize={10}
        totalItems={35}
        pageText="Transactions"
        onPrev={handlePrevClick}
        onNext={handleNextClick}
      />
    </AppView>
  )
}
