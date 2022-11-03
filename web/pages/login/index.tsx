import {Auth, ThemeMinimal, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from '../../components/Account'
import {Container} from "@mantine/core";

const Login = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <div className="container" style={{padding: '50px 0 100px 0'}}>
            {!session ? (
                <Container size="xs" px="xs">
                    <Auth
                        supabaseClient={supabase}
                        appearance={{theme: ThemeSupa}}
                        magicLink={true}
                        providers={['google', 'github']}
                    />
                </Container>
            ) : (
                <Account session={session}/>
            )}
        </div>
    )
}

export default Login