import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUserTabel } from './lib/features/auth/auth.slice'
import { usePathname, useRouter } from 'next/navigation'

export default function GetInitialState({ children }) {
  const dispatch = useDispatch()
  const { user, userTable } = useSelector((state) => state.auth)
  const path = usePathname()
  const router = useRouter()
  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) !== 'underfined' &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

    if (auth && auth?.session?.access_token && !user) {
      dispatch(setUser(auth))
    }

    if (table && table.email && !userTable) {
      dispatch(setUserTabel(table))
    }

    if (!auth && !table && path.slice(1, 5) === 'play') {
      router.push('/')
    }
  }, [user, dispatch, path, router, userTable])

  return <>{children}</>

}
