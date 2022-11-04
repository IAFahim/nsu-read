import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'

import { Database } from '../utils/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [requestMade, setRequestMade] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      if(session && requestMade) {
        const data = await supabase.from("profiles").select("*").eq("id", user?.id).single()
        console.log('data', data)
        setRequestMade(false)
      }
    }
    fetchProfile();
  },[])

  return (
    <div>
        <h1>Account</h1>
    </div>
  )
}
