import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function getSafeRedirectUrl(rawUrl) {
  if (!rawUrl) return '/dashboard'
  // Prevent open redirect vulnerabilities: must start with single '/' and not '//'
  if (rawUrl.startsWith('/') && !rawUrl.startsWith('//') && !rawUrl.includes(':')) {
    return rawUrl
  }
  return '/dashboard'
}

export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading, refreshUser } = useAuth()
  const [searchParams] = useSearchParams()
  const oauthToken = searchParams.get('session_token') || searchParams.get('token')
  const [isProcessingToken, setIsProcessingToken] = React.useState(() => Boolean(oauthToken))

  React.useEffect(() => {
    let isMounted = true
    if (oauthToken) {
      localStorage.setItem('forma_auth_token', oauthToken)
      refreshUser().finally(() => {
        if (isMounted) {
          setIsProcessingToken(false)
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [oauthToken, refreshUser])

  if (isAuthenticated) {
    const destination = getSafeRedirectUrl(searchParams.get('redirect'))
    return <Navigate to={destination} replace />
  }

  if (isProcessingToken || isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#09090b] flex flex-col items-center justify-center gap-4 text-[#fbf9f5]">
        <div className="w-10 h-10 rounded-lg bg-[#181820] border border-[#ff6326]/40 flex items-center justify-center font-bold text-[#ff6326] animate-pulse">
          FORMA
        </div>
      </div>
    )
  }

  return <>{children}</>
}
