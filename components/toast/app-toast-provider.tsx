import { AppToast, AppToastProps } from '@/components/toast/app-toast'
import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react'

type AppToastParams = Pick<AppToastProps, 'title' | 'subtitle' | 'type'>
type AppToastContextProps = {
  showToast: (options: AppToastParams) => void
  hideToast: () => void
}

const DEFAULT_PARAMS: AppToastProps = {
  visible: false,
  title: '',
  subtitle: '',
  type: 'info', // or your default type
}
const AppToastContext = createContext<AppToastContextProps | undefined>(undefined)

export const AppToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [params, setParams] = useState<AppToastProps>(DEFAULT_PARAMS)

  const showToast = useCallback((params: AppToastParams) => setParams({ visible: true, ...params }), [])
  const hideToast = useCallback(() => setParams(DEFAULT_PARAMS), [])

  return (
    <AppToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <AppToast {...params} />
    </AppToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(AppToastContext)
  if (!context) throw new Error('useToast must be used within AppAppToastProvider')
  return context
}
