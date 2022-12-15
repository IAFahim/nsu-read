import {useEffect, useRef, useState} from 'react'
import {useSession, useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {Database} from '../../utils/database.types'
import {useRouter} from 'next/router';
import SetUserName from "../../components/Profile/SetUserName";
import Profile from "../../components/Profile/Profile";
import useProfile from "../../store/UseProfile";
import {Box, Overlay} from "@mantine/core";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

type Profiles = Database['public']['Tables']['users']['Row']


export default function Account() {
    const supabase = useSupabaseClient<Database>()
    const session = useSession()
    const user = useUser()
    const SetProfile = useProfile(state => state.SetProfiles);
    const profile = useProfile(state => state.profiles);
    const router = useRouter();
    const lock = useRef(true);


    useEffect(() => {
        if (!router.isReady) return;

        async function fetchProfile() {
            if (lock.current) {
                lock.current = false;
                console.log(router.query.username !== undefined, router.query.username, profile?.username)
                let data = null as PostgrestSingleResponse<any> | null;
                if (router.query.username !== undefined && router.query.username !== profile?.username) {
                    data = await supabase.from("users").select("*").eq("username", router.query.username).single();
                } else {
                    data = await supabase.from("users").select("*").eq("id", session?.user?.id).single()
                }
                if (data.data) {
                    SetProfile(data.data)
                }
                console.log('data', data.data)
            }
        }

        fetchProfile();
    }, [session, router.isReady])

    return (
        <>
            {lock && session && profile?.username == null && <SetUserName profile={profile as Profiles}/>}
            <Box sx={{height: "70vh", position: 'relative'}} mt={10} p={10}>
                {profile?.username == null && <Overlay opacity={0.6} color="#000" zIndex={5}/>}
                <Profile profile={profile as Profiles}/>
            </Box>
        </>
    )
}
