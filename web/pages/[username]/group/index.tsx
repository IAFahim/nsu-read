import {forwardRef, SetStateAction, useEffect, useRef, useState} from 'react';
import {
    Checkbox,
    Group,
    Avatar,
    Text,
    TransferList,
    TransferListData,
    TransferListItemComponent,
    TransferListItemComponentProps,
    Container,
    Input,
    Flex,
    Button,
    TransferListItem,
    Select,
    MultiSelect,
    Textarea,
    Title,
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
    image: string;
    label: string;
    description: string;
}

const selectedUser = forwardRef<HTMLDivElement, ItemProps>(
    ({image, label, description, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image}/>

                <div>
                    <Text>{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({label, description, ...others}: ItemProps, ref) => (
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
    const [usersGroupList, SetUsersGroupList] = useState([] as TransferListItem[]);
    const [group_members, SetGroup_members] = useState([] as TransferListItem[]);
    const supabase=useSupabaseClient<Database>();

    const [mainGroup, SetMainGroup] = useState([] as TransferListItem[]);
    const [otherGroup, SetOtherGroup] = useState([] as TransferListItem[]);
    const [data, setData] = useState<TransferListData>([mainGroup, otherGroup]);
    const profile = useProfile(state => state.profiles);

    const newGroupName = useRef<HTMLInputElement>("" as unknown as HTMLInputElement);
    const [newGroupDescription, setNewGroupDescription] = useState('');
    const mainGroupName = useRef<HTMLInputElement>("" as unknown as HTMLInputElement);
    const otherGroupName = useRef<HTMLInputElement>("" as unknown as HTMLInputElement);

    const lock = useRef(true);
    const router = useRouter();
    useEffect(() => {
        async function fetchGroups() {
            if (!router.isReady) return;
            if (lock.current) {
                lock.current = false;
                const group = await supabase.from("groups").select("*").eq("created_by", profile?.username);
                if (group.data) {
                    SetUsersGroupList(group.data.map(function (element) {
                        let obj = {
                            label: element.name,
                            value: element.name,
                            description: element.description

                        }
                        console.log(obj, element)
                        return obj
                    }))
                }
            }
        }
        async function fetchUsers() {
            const {data, error} = await supabase.from("users").select("*");
            if (data) {
                const users = data.map((user) => ({
                    value: user.username,
                    label: user.username,
                    description: user.bio,
                    image: user.avatar_url,
                }));
                SetGroup_members(users);
                console.log("Users:",users)
            }else {
                console.log(error)
            }
        }

        fetchGroups().then(_=>{
            fetchUsers()
        });
    }, [router.isReady]);

    const createGroup = async () => {

        const {data, error} = await supabase
            .from('groups')
            .insert([
                {
                    created_by: profile?.username,
                    name: newGroupName.current.value,
                    description: newGroupDescription
                },
            ]);
        if (error) {
            console.log(error);
        } else {
            let userlist = selectedMembers.map((value, index)=>{
                return {
                    created_by: profile?.username,
                    group_name: newGroupName.current.value,
                    member_name: value,
                    role: "student"
                }
            })
            const users = await supabase.from("group_members").insert(userlist);
        }

    }

    const [value, setValue] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    return (
        <Container>
            <Title>New</Title>
            <Group mb={5}>
                <Input ref={newGroupName} placeholder="Name" style={{flexGrow: 1}}/>
                <Button onClick={createGroup}>Publish</Button>
            </Group>
            <Textarea value={newGroupDescription}
                      onChange={(event) => setNewGroupDescription(event.currentTarget.value)}
                      placeholder={"Description"}></Textarea>
            <Group>
                <MultiSelect
                    label="Choose User to add to this group"
                    placeholder="comma ',' separated usernames"
                    itemComponent={SelectItem}
                    style={{flexGrow: 1}}
                    data={group_members}
                    value={selectedMembers}
                    onChange={setSelectedMembers}
                    searchable
                    clearable
                    nothingFound="Nobody here"
                    maxDropdownHeight={400}
                    filter={(value, selected, item) =>
                        !selected && item.label &&
                        (item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                            item.description.toLowerCase().includes(value.toLowerCase().trim()))
                    }
                />
            </Group>

            <Title mt={"xl"}>Edit</Title>

            <Flex justify={"space-between"}>
                <Select
                    placeholder="Your Groups"
                    // itemComponent={SelectItem}
                    data={usersGroupList}
                    value={value}
                    onChange={setValue}
                    searchable
                    style={{flexGrow: 1}}

                    maxDropdownHeight={400}
                    nothingFound="Nobody here"
                    filter={(value, item) => {
                        return item.label != null && item.label.toLowerCase().includes(value.toLowerCase().trim());
                    }}
                />
                <Button ml={"xs"} mr={"xl"} onClick={async () => {

                }
                }>Add</Button>

                <Input pr={"xs"} placeholder="Group to be transferred" style={{flexGrow: 1}}/>
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