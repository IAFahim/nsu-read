import {forwardRef, SetStateAction, useEffect, useRef, useState} from 'react';
import {
    Checkbox,
    Group,
    Avatar,
    Text,
    TransferList,
    TransferListData,
    TransferListItemComponent,
    TransferListItemComponentProps, Container, Input, Flex, Button, TransferListItem, Select,
} from '@mantine/core';
import {Database} from "../../../utils/database.types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useProfile from "../../../store/UseProfile";
import {useRouter} from "next/router";

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

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" opacity={0.65}>
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);




type GroupShowAll = Database['public']['Tables']['groups']['Row'];
export default function ManageGroup() {
    const [mainGroup, SetMainGroup] = useState([
        {
            label: 'Student',
            value: 'bender',
            image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
            description: 'Fascinated with cooking, though has no sense of taste',
        },

        {
            label: 'Student',
            value: 'carol',
            image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
            description: 'One of the richest people on Earth',
        }
    ] as TransferListItem[]);
    const [otherGroup, SetOtherGroup] = useState([] as TransferListItem[]);
    const [data, setData] = useState<TransferListData>([mainGroup, otherGroup]);
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
    useEffect(() => {

    }, []);

    return (
        <Container>
            <Group mb={"xs"}>
                <Input placeholder="Name" style={{flexGrow: 1}}
                       onChange={(e: { target: { value: SetStateAction<string>; }; }) => setGName(e.target.value)}/>
                <Button onClick={createGroup}>Publish</Button>
            </Group>

            <Flex justify={"space-between"}>
                <Select
                    placeholder="Pick one"
                    itemComponent={SelectItem}
                    data={mainGroup}
                    searchable
                    style={{flexGrow: 1}}
                    maxDropdownHeight={400}
                    nothingFound="Nobody here"
                    filter={(value, item) =>
                        // @ts-ignore
                        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                        item.description.toLowerCase().includes(value.toLowerCase().trim())
                    }
                />
                <Button ml={"xs"} mr={"xl"} onClick={createGroup}>Add</Button>

                <Input pr={"xs"} placeholder="Group to be transferred" style={{flexGrow: 1}}
                       onChange={(e: { target: { value: SetStateAction<string>; }; }) => setGName(e.target.value)}/>
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