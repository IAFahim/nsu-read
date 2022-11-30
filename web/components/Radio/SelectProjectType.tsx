import {useState} from 'react';
import {Switch, Group, useMantineTheme, Radio} from '@mantine/core';
import {IconCheck, IconX} from '@tabler/icons';
import useProjects from "../../store/UseProjects";

export default function SelectProjectType() {
    const theme = useMantineTheme();
    const type = useProjects(state => state.type);
    const SetType = useProjects(state => state.SetType);
    return (
        <Radio.Group
            name="favoriteFramework"
            value={type}
            onChange={(event) => {
                SetType(event)
            }}
            orientation="vertical"
            label="Make the Project"
            description="You can change it at any time"
            spacing="xs"
            withAsterisk
        >
            <Radio value="Public" label="Public"/>
            <Radio value="Unlisted" label="Unlisted"/>
            <Radio value="Private" label="Private"/>
        </Radio.Group>
    );
}