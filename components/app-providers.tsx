/* eslint-disable import/no-duplicates */
import { AppTheme } from '@/components/app-theme'
import { AuthProvider } from '@/components/auth/auth-provider'
import { SolanaProvider } from '@/components/solana/solana-provider'
import '@/i18n'
import i18n from '@/i18n'
import RaffleSocketProvider from '@/providers/RaffleSocketProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ClusterProvider } from './cluster/cluster-provider'
import { AppToastProvider } from './toast/app-toast-provider'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppTheme>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ClusterProvider>
            <AppToastProvider>
              <SolanaProvider>
                <RaffleSocketProvider />
                <AuthProvider>{children}</AuthProvider>
              </SolanaProvider>
            </AppToastProvider>
          </ClusterProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </AppTheme>
  )
}
