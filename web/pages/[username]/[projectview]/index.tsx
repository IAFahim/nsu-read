import {Group, Menu, Tabs} from "@mantine/core";
import {IconEdit, IconEye, IconGraph, IconTestPipe, IconTextPlus, IconUser} from "@tabler/icons";
import Read from "../../../components/Read/Read";
import GroupShowAll from "../../../components/Group/GroupShowAll";

function TopTab() {
    return (
        <Tabs defaultValue="Read">
            <Tabs.List>
                <Tabs.Tab icon={<IconTextPlus size={14}/>} value="Read">Read</Tabs.Tab>
                <Tabs.Tab icon={<IconUser size={14}/>} value="Group">Group</Tabs.Tab>
                <Tabs.Tab icon={<IconTestPipe size={14}/>} value={"Quiz"}>Quiz</Tabs.Tab>
                <Tabs.Tab icon={<IconGraph size={14}/>} value="Statistic">Statistic</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={"Read"}>
                <Read/>
            </Tabs.Panel>
            <Tabs.Panel value={"Group"}>
                <GroupShowAll/>
            </Tabs.Panel>
        </Tabs>
    );
}

export default function ProjectView() {
    return (<><TopTab/></>)
}