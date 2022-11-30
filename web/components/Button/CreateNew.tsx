import { Button, Menu, Text, useMantineTheme } from '@mantine/core';
import {
    IconSquareCheck,
    IconPackage,
    IconUsers,
    IconCalendar,
    IconChevronDown,
} from '@tabler/icons';
import router from "next/router";
import useProfile from "../../store/UseProfile";

export default function CreateNew() {
    const profile = useProfile(state => state.profiles);
    const theme = useMantineTheme();
    return (
        <Menu transition="pop-top-right" position="top-end" width={220} withinPortal>
            <Menu.Target>
                <Button mb={1} mt={"xl"} rightIcon={<IconChevronDown size={18} stroke={1.5} />} pr={12}>
                    Create new
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => router.push(`${profile?.username}/new`)}
                    icon={<IconPackage size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                    rightSection={
                        <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                            Ctrl + P
                        </Text>
                    }
                >
                    Project
                </Menu.Item>
                <Menu.Item onClick={() => router.push(`${profile?.username}/group`)}
                    icon={<IconUsers size={16} color={theme.colors.cyan[6]} stroke={1.5} />}
                    rightSection={
                        <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                            Ctrl + U
                        </Text>
                    }
                >
                    Team
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}