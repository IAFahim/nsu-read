import {Button, Container, Flex, Input, TextInput, Tooltip} from "@mantine/core";
import {IconAt, IconSend} from "@tabler/icons";
import {Database} from "../../utils/database.types";
import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useRef, useState} from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";

type Profiles = Database['public']['Tables']['profiles']['Row']
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
        } = await supabase.from("profiles").update({username: ref.current?.value}).eq("id", session?.user?.id)
        if (error) {
            console.log('error', error)
        }else{
            router.reload();
        }
        console.log('data', data)
    }

    return (
        <div id="SetUserName">
            <Flex pt={"xl"} align={"flex-end"} justify={"center"}>
                <TextInput ref={ref}
                           label="Our dev is so Bad that you can't continue without a username"
                           size={"xl"}
                           description={"Please enter a username Like " + profile?.full_name}
                           placeholder="Focus me to see tooltip"
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
                <Button leftIcon={<IconSend/>} ml={"xl"} size={"xl"} onClick={() => {
                    updateUsername()
                }}>Submit</Button>
            </Flex>
        </div>
    )
}