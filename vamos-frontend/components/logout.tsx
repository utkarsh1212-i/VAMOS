import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import apiClient from '../utils/apiManager'
import { apiUrls } from '../utils/apiUrls'

export default function Logout() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const clearAllAuthCookies = () => {
    // Clear Next-Auth cookies
    Cookies.remove('next-auth.session-token');
    Cookies.remove('next-auth.csrf-token');
    Cookies.remove('next-auth.callback-url');
    
    // Clear custom auth cookies
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');

    // If using secure cookies in production, also clear those
    if (process.env.NODE_ENV === 'production') {
      Cookies.remove('__Secure-next-auth.session-token');
      Cookies.remove('__Secure-next-auth.csrf-token');
      Cookies.remove('__Secure-next-auth.callback-url');
    }

    // Clear session storage
    sessionStorage.clear();
    localStorage.clear();
  };

  const handleLogout = async () => {
    try {
      setLoading(true)
      console.log("session", session)
      // Call backend logout endpoint
      // await apiClient.post(apiUrls.LOGOUT)
      
      clearAllAuthCookies()
      
      // Sign out from NextAuth
      await signOut({ redirect: false, callbackUrl: '/signin' })
      console.log("signout done::::::")
      // Clear all auth-related cookies
      
      // Redirect to signin page
      router.push('/signin')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if the API call fails, clear local data and redirect
      Cookies.remove('authToken')
      Cookies.remove('refreshToken')
      sessionStorage.clear()
      router.push('/signin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {session || Cookies.get('authToken') ? (
        <div>
          <button 
            onClick={handleLogout}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
