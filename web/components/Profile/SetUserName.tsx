import {Button, Container, Flex, Input, TextInput, Tooltip, useMantineTheme} from "@mantine/core";
import {IconArrowLeft, IconArrowRight, IconAt, IconSend} from "@tabler/icons";
import {Database} from "../../utils/database.types";
import {JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useRef, useState} from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";

type Profiles = Database['public']['Tables']['users']['Row']

function ActionIcon(props: { size: number, variant: string, radius: string, children: ReactNode }) {
    return null;
}

export default function SetUserName({profile}: { profile: Profiles }) {
    const [focused, setFocused] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const supabase = useSupabaseClient<Database>()
    const session = useSession();
    const router = useRouter();
    const updateUsername = async () => {
        const {
            data,
            error
        } = await supabase.from("users").update({username: ref.current?.value}).eq("id", session?.user?.id)
        if (error) {
            console.log('error', error)
        }else{
            router.reload();
        }
        console.log('data', data)
    }
    const theme = useMantineTheme();
    return (
        <div id="SetUserName">
            <Flex pt={"xl"} align={"flex-end"} justify={"center"}>
                <TextInput ref={ref}
                           label="Our dev is so Bad that you can't continue without a username"
                           size={"xl"}
                           description={"Please enter a username Like: " + profile?.full_name}
                           placeholder="Username"
                           onFocus={() => setFocused(true)}
                           icon={<IconAt/>}
                           onBlur={() => setFocused(false)}
                           inputContainer={(children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => (
                               <Tooltip label="It would be your permanent identity" position="bottom-start"
                                        opened={focused}>
                                   {children}
                               </Tooltip>
                           )}
                />
                <Button leftIcon={<IconSend/>} mb={2} ml={"xl"} size={"xl"} onClick={() => {
                    updateUsername()
                }}>Submit</Button>
            </Flex>
        </div>
    )
}