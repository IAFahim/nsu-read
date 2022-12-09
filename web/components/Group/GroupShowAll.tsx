import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Collapse, Button, Flex} from '@mantine/core';
import React, {useState} from 'react';
import CreateByGroupName from "./CreateByGroupName";


export default function GroupShowAll() {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Group grow position={"center"}>
                First string
                <>
                    <div>element inside fragment</div>
                    <div>another inside fragment</div>
                </>
                {20}

                <Button variant={"outline"} style={{maxWidth: 100}}>Quiz</Button>
                <Button style={{maxWidth: 100}} onClick={() => {
                    setOpened(!opened)
                }}>Show</Button>

            </Group>



                <CreateByGroupName  />
        </>
    );
}


