import { UserData, useUserData } from 'components/shared/user-data-provider'

export const HandlePermission = (callback?: any) => {
  const { userData } = useUserData()

  if (!userData || userData.role !== 'master') return null
  return callback
}

export const hasPermission = (userData: UserData | null) => {
  return userData?.role === 'master'
}
