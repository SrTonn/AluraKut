import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

// eslint-disable-next-line import/prefer-default-export
export function useUser() {
  const value = useContext(UserContext)
  return value
}
