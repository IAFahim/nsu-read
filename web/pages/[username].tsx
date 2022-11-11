import {useEffect, useRef, useState} from 'react'
import {useSession, useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {Database} from '../utils/database.types'
import {useRouter} from 'next/router';
import {GetServerSideProps} from "next";
import {ImageIcon} from "@mantine/core/lib/Image/ImageIcon";
import {Avatar, Image} from "@mantine/core";
import {AvatarGroup} from "@mantine/core/lib/Avatar/AvatarGroup/AvatarGroup";
import SetUserName from "../components/Profile/SetUserName";
import Profile from "../components/Profile/Profile";

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
    const supabase = useSupabaseClient<Database>()
    const session = useSession()
    const user = useUser()
    const [profile, setProfile] = useState<Profiles | null>(null)
    const router = useRouter();
    const lock = useRef(true);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        async function fetchProfile() {
            if (lock.current) {
                lock.current = false;
                const data = await supabase.from("profiles").select("*").eq("id", session?.user?.id).single()
                if (data.data) {
                    setProfile(data.data);
                }
                console.log('data', data.data)
            }
        }

        fetchProfile();
    }, [router.isReady, session])

    return (
        <>
            {profile?.username == null ? <SetUserName profile={profile as Profiles}/> : <Profile profile={profile as Profiles}/>}
        </>
    )
}
