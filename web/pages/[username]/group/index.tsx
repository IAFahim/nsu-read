import {SetStateAction, useEffect, useRef, useState} from 'react';
import {
    Checkbox,
    Group,
    Avatar,
    Text,
    TransferList,
    TransferListData,
    TransferListItemComponent,
    TransferListItemComponentProps, Container, Input, Flex, Button,
} from '@mantine/core';
import {Database} from "../../../utils/database.types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useProfile from "../../../store/UseProfile";
import {useRouter} from "next/router";

let mockdata = [
    {
        value: 'bender',
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        label: 'Student',
        description: 'Fascinated with cooking, though has no sense of taste',
    },

    {
        value: 'carol',
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        label: 'Student',
        description: 'One of the richest people on Earth',
    },
];

const ItemComponent: TransferListItemComponent = ({
                                                      data,
                                                      selected,
                                                  }: TransferListItemComponentProps) => (
    <Group noWrap>
        <Avatar src={data.image} radius="xl" size="lg"/>
        <div style={{flex: 1}}>
            <Text size="sm" weight={500}>
                {data.label}
            </Text>
            <Text size="xs" color="dimmed" weight={400}>
                {data.description}
            </Text>
        </div>
        <Checkbox checked={selected} onChange={() => {
        }} tabIndex={-1} sx={{pointerEvents: 'none'}}/>
    </Group>
);

type GroupShowAll = Database['public']['Tables']['groups']['Row'];
export default function ManageGroup() {
    const [data, setData] = useState<TransferListData>([mockdata, []]);
    const supabase = useSupabaseClient<Database>();
    const profile = useProfile(state => state.profiles);
    const [g_name, setGName] = useState("");
    const createGroup = async () => {
        const data = await supabase.from("groups").insert({
            id: profile?.id,
            name: g_name,

        });
    };
    const getMembers = async () => {
        const data = await supabase.from("groups").select("*");

    };
    const lock = useRef(true);
    const router = useRouter();

    // useEffect(() => {
    //     async function fetchProfile() {
    //         if (lock.current) {
    //             lock.current = false;
    //             const data = await supabase.from("profiles").select("*").eq("id", session?.user?.id).single()
    //             if (data.data) {
    //                 SetProfile(data.data)
    //             }
    //             console.log('data', data.data)
    //         }
    //     }
    //
    //     fetchProfile();
    // }, [session])

    return (
        <Container>
            <Flex justify={"space-between"}>
                <Input placeholder="GroupShowAll Name" style={{flexGrow:1}} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setGName(e.target.value)}/>
                <Button mr={"xl"} onClick={createGroup}>Set</Button>

                <Input placeholder="GroupShowAll Name" style={{flexGrow:1}} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setGName(e.target.value)}/>
                <Button>Fetch</Button>
            </Flex>
            <TransferList
                value={data}
                onChange={setData}
                searchPlaceholder="Search employees..."
                nothingFound="No one here"
                titles={['Current group members', 'transfer group members']}
                listHeight={300}
                breakpoint="sm"
                itemComponent={ItemComponent}
                filter={(query, item) =>
                    item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
                    item.description.toLowerCase().includes(query.toLowerCase().trim())
                }
            />
        </Container>
    );
}