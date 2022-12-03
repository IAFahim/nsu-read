import { Avatar,Group,Text } from "@mantine/core";
import React from "react";

export default function GroupList() {

    return (
        <div>
            <Group noWrap>
                <Avatar src="https://img.icons8.com/clouds/256/000000/futurama-bender.png" />
                <div>
                    <Text>Bender Bending Rodríguez</Text>
                    <Text size="xs" color="dimmed">
                        Fascinated with cooking
                    </Text>
                </div>
            </Group>
            <Group noWrap>
                <Avatar src="https://img.icons8.com/clouds/256/000000/futurama-mom.png" />
                <div>
                    <Text>Carol Miller</Text>
                    <Text size="xs" color="dimmed">
                        One of the richest people on Earth
                    </Text>
                </div>
            </Group>
            <Group noWrap>
                <Avatar src="https://img.icons8.com/clouds/256/000000/homer-simpson.png" />
                <div>
                    <Text>Homer Simpson</Text>
                    <Text size="xs" color="dimmed">
                        Overweight, lazy, and often ignorant
                    </Text>
                </div>
            </Group>
            <Group noWrap>
                <Avatar src="https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png" />
                <div>
                    <Text>Spongebob Squarepants</Text>
                    <Text size="xs" color="dimmed">
                        Not just a sponge
                    </Text>
                </div>
            </Group>
        </div>
    )
}