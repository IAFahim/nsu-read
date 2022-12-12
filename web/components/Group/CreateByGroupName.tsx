import {
    ActionIcon,
    Avatar,
    Button,
    Collapse,
    Container,
    Flex,
    Group,
    Menu,
    ScrollArea,
    Table,
    Text
} from "@mantine/core";
import {IconDots, IconMessages, IconNote, IconPencil, IconReportAnalytics, IconTrash} from "@tabler/icons";
import React, {useState} from "react";
import router, {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../utils/database.types";


export default function CreateByGroupName({GroupData}: { GroupData: { name: string, descption: string, created_at: string } }) {
    let router = useRouter();
    const [data, setData] = useState([] as { member_name: string; role: string }[]);


    const rows = data.map((item) => (
        <tr style={{backgroundColor: "#eeeeee"}} key={item.member_name}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} radius={40}/>
                    <div>
                        <Text size="sm" weight={500}>
                            {item.member_name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {item.role}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <ActionIcon>
                        <IconPencil size={16} stroke={1.5}/>
                    </ActionIcon>
                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5}/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconMessages size={16} stroke={1.5}/>}>Send message</Menu.Item>
                            <Menu.Item icon={<IconNote size={16} stroke={1.5}/>}>Add note</Menu.Item>
                            <Menu.Item icon={<IconReportAnalytics size={16} stroke={1.5}/>}>Analytics</Menu.Item>
                            <Menu.Item icon={<IconTrash size={16} stroke={1.5}/>} color="red">
                                Terminate contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    const [opened, setOpened] = useState(false);
    const supabase = useSupabaseClient<Database>();
    const fetchGroupMembers = async () => {
        const data = await supabase.from("group_members").select("*").eq("group_name", GroupData.name);
        console.log(data.data);
        if (data.data) {
            // @ts-ignore
            setData(data.data);
        }
        setOpened(!opened);
    }

    return (
        <Container>
            <Flex justify={"space-between"} pt={"xs"}>
                <Group>
                    <Text>{GroupData.name}</Text>
                    <Text size={"xs"} color={"dimmed"}>{GroupData?.created_at.split("T")[0]}</Text>
                </Group>
                <Text size={"xs"} color={"dimmed"}>{GroupData.descption}</Text>
                <Group pb={"xs"}>
                    <Button variant={"outline"} style={{maxWidth: 100}} onClick={() => {
                        router.push(`/${router.query.username}/${router.query.project}/quiz/${GroupData.name}`)
                    }
                    }>Quiz</Button>
                    <Button style={{maxWidth: 100}} onClick={fetchGroupMembers}>Show</Button>
                </Group>

            </Flex>
            <Collapse in={opened}>
                <Container>
                    <ScrollArea>
                        <Table sx={{minWidth: 800}} verticalSpacing="xs">
                            <tbody>{rows}</tbody>
                        </Table>
                    </ScrollArea>
                </Container>
            </Collapse>
        </Container>
    );
}
