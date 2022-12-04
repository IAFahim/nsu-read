import {Button, Menu} from "@mantine/core";
import {IconEdit, IconEye, IconTestPipe, IconTrash} from "@tabler/icons";

export default function GroupActionButton() {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button>Manage</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item icon={<IconTestPipe size={14} />}>Quiz</Menu.Item>
                <Menu.Item icon={<IconEye size={14} />}>Statistic</Menu.Item>
                <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" icon={<IconTrash size={14} />}>Remove Group</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}