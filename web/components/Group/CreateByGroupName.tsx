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


export default function CreateByGroupName({GroupData}: { GroupData: { group_name: string } }) {
    let router = useRouter();
    const [data, setData] = useState([] as { member_name: string; role: string }[]);


    const rows = data.map((item) => (
        <tr style={{backgroundColor: "#eeeeee"}} key={item.member_name}>
            <td>
                <Group spacing="sm" style={{cursor: "pointer"}} onClick={()=>{
                    router.push("/"+item.member_name)
                }}>
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
        </tr>
    ));

    const [opened, setOpened] = useState(false);
    const supabase = useSupabaseClient<Database>();
    const fetchGroupMembers = async () => {
        const data = await supabase.from("group_members").select("*").eq("group_name", GroupData.group_name);
        console.log(data.data);
        if (data.data) {
            // @ts-ignore
            setData(data.data);
        }
        setOpened(!opened);
    }

    return (
        <>
            <Flex justify={"space-between"} pt={"xs"}>
                <Group>
                    <Text>{GroupData.group_name}</Text>
                </Group>
                <Group pb={"xs"}>
                    <Button variant={"outline"} style={{maxWidth: 100}} onClick={() => {
                        router.push(`/${router.query.username}/${router.query.project}/quiz/${GroupData.group_name}`)
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
        </>
    );
}
