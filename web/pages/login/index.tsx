import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {Container} from "@mantine/core";

const Login = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <div className="container" style={{padding: '50px 0 100px 0'}}>
            <Container size="xs" px="xs">
                <Auth
                    supabaseClient={supabase}
                    appearance={{theme: ThemeSupa}}
                    magicLink={true}
                    providers={['google']}
                    redirectTo="http://localhost:3000"
                />
            </Container>
        </div>
    )
}

export default Login