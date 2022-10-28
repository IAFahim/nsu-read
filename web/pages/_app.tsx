import {AppProps} from 'next/app';
import Head from 'next/head';
import {MantineProvider} from '@mantine/core';

export default function App(props: AppProps) {
    const {Component, pageProps} = props;

    return (
        <>
            <Head>
                <title>NSU-Read</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light',
                    globalStyles:theme => {
                        return {
                            body: {
                                fontFamily: theme.fontFamily,
                                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                            },
                            h2:{
                               marginBottom:theme.spacing.xs,
                            },
                            p:{
                              marginTop:0,
                            }

                        };
                    }
                }}

            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
}