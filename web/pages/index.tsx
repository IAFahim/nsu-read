import type {NextPage} from 'next'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from "./[username]";
import SRS from './srs';
import {Database} from "../utils/database.types";


const Home: NextPage = () => {
    const session = useSession()
    const supabase = useSupabaseClient<Database>()


    return (
        session ? <Account/> : <SRS/>
    )
}

export default Home
