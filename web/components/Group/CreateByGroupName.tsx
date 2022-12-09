import {ActionIcon, Avatar, Collapse, Container, Group, Menu, ScrollArea, Table, Text} from "@mantine/core";
import {IconDots, IconMessages, IconNote, IconPencil, IconReportAnalytics, IconTrash} from "@tabler/icons";
import React, {useState} from "react";


export default function CreateByGroupName() {

    const [data, setData] = useState([{
        "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "email": "rob_wolf@gmail.com",
        "job": "Engineer",
        "name": "Robert Wolfkisser",
        "rate": 22
    },
        {
            "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "email": "rob_wolf@gmail.com",
            "job": "Engineer",
            "name": "Robert Wolfkisser",
            "rate": 22
        }
    ] as { avatar: string; name: string; job: string; email: string; rate: number }[]);


    const rows = data.map((item) => (
        <tr style={{backgroundColor: "#eeeeee"}} key={item.name}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={item.avatar} radius={40}/>
                    <div>
                        <Text size="sm" weight={500}>
                            {item.name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {item.job}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text size="sm">{item.email}</Text>
                <Text size="xs" color="dimmed">
                    Email
                </Text>
            </td>
            <td>
                <Text size="sm">${item.rate.toFixed(1)} / hr</Text>
                <Text size="xs" color="dimmed">
                    Rate
                </Text>
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
    return (
        <Collapse in={opened}>
            <Container>
                <ScrollArea>
                    <Table sx={{minWidth: 800}} verticalSpacing="xs">
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Container>
        </Collapse>
    );
}
