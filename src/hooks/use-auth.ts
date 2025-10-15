import { signOutFn } from '@/server/functions/auth'
import { useLoaderData } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

export function useAuth() {
  const { currentUser } = useLoaderData({ from: '__root__' })
  const signOut = useServerFn(signOutFn)

  return {
    currentUser,
    signOut,
  }
}
