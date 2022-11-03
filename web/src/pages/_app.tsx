import {AppProps} from 'next/app';
import Head from 'next/head';
import {Header, MantineProvider} from '@mantine/core';
import Hero from "../components/SRS/Hero";
import {HeaderMantine} from "../components/Header/HeaderMantine";
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, Session} from '@supabase/auth-helpers-react'
import {useState} from "react";

export default function App({Component, pageProps,}: AppProps<{ initialSession: Session, }>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <Head>
                <title>NSU-Read</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light',
                    globalStyles: theme => {
                        return {
                            body: {
                                fontFamily: theme.fontFamily,
                                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                            },
                            h1: {
                                marginBottom: theme.spacing.xs,

                            },
                            h2: {
                                marginTop: theme.spacing.xs,
                                marginBottom: 10,
                            },
                            h3: {
                                marginTop: theme.spacing.xs,
                            },
                            p: {
                                marginTop: 0,
                            }

                        };
                    }
                }}
            >
                <HeaderMantine/>
                <Component {...pageProps} />
            </MantineProvider>
        </SessionContextProvider>
    )
}
