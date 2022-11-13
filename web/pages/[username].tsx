import {useEffect, useRef} from 'react'
import {useSession, useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {Database} from '../utils/database.types'
import {useRouter} from 'next/router';
import SetUserName from "../components/Profile/SetUserName";
import Profile from "../components/Profile/Profile";
import useLoginState from "../store/UseLoginState";

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
    const supabase = useSupabaseClient<Database>()
    const session = useSession()
    const user = useUser()
    const SetProfile=useLoginState(state=>state.SetProfiles);
    const profile=useLoginState(state=>state.profiles);
    const router = useRouter();
    const lock = useRef(true);

    useEffect(() => {
        async function fetchProfile() {
            if (lock.current) {
                lock.current = false;
                const data = await supabase.from("profiles").select("*").eq("id", session?.user?.id).single()
                if (data.data) {
                    SetProfile(data.data)
                }
                console.log('data', data.data)
            }
        }

        fetchProfile();
    }, [session])

    return (
        <>
            {!lock && session && profile?.username==null && <SetUserName profile={profile as Profiles}/>}
            <Profile profile={profile as Profiles}/>
        </>
    )
}
