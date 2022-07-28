import { useContext } from 'react'
import { TransactionContext } from './TransactionContext'

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  if (context === undefined) {
    throw new Error('useTransactionContext can only be used inside UserContext')
  }

  return context
}
