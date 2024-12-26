import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Logout() {

    const { data : session} = useSession()
  return (
    <div>
        {session  ?
        (<div>
            <button onClick={() => signOut({ callbackUrl : '/signin'})}>Sign Out</button>
        </div>) : null}
    </div>
  )
}
