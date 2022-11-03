import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconLogout, IconHelp, IconRelationOneToMany,
} from '@tabler/icons';
import Link from "next/link";
import {NextResponse} from 'next/server';
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: 'SRS',
        description: 'The SRS system is a spaced repetition system that helps you learn faster and more efficiently.',
        link: '/srs',
    },
    {
        icon: IconHelp,
        title: 'Tutorial',
        description: 'Learn how to use the NSU-Read system and how to get the most out of it.',
        link: '/tutorial',
    },
    {
        icon: IconRelationOneToMany,
        title: 'UML Diagram',
        description: 'Understand the UML diagram and how it is used to create a database.',
        link: "/"
    },
];

export function HeaderMantine() {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
    const {classes, theme} = useStyles();
    const router = useRouter();

    const links = mockdata.map((item) => (
        <Link href={item.link} passHref style={{textDecoration: "none"}} key={item.title}>
            <UnstyledButton className={classes.subLink} onClick={closeDrawer}>
                <Group noWrap align="flex-start">
                    <ThemeIcon size={34} variant="default" radius="md">
                        <item.icon size={22} color={theme.fn.primaryColor()}/>
                    </ThemeIcon>
                    <div>
                        <Text size="sm" weight={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </Link>
    ));

    return (
        <Box>
            <Header height={60} px="md">
                <Group position="apart" sx={{height: '100%'}}>
                    <IconLogout size={30}/>
                    <Group sx={{height: '100%'}} spacing={10} className={classes.hiddenMobile}>
                        <Box component="span" mr={5} onClick={() => {
                            router.push("/")
                        }}>
                            Home
                        </Box>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Center inline>
                                    <Box component="span" mr={5}>
                                        Learn
                                    </Box>
                                    <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                                </Center>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{overflow: 'hidden'}} onClick={closeDrawer}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Button onClick={() => {
                            router.push("/login")
                        }} variant="default">Get Started</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop}/>
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                style={{paddingBottom: 0}}
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{height: 'calc(100vh - 60px)'}} mx="-md">
                    <Divider color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
                    <Box component="span" mr={5} className={classes.link} onClick={() => {
                        closeDrawer()
                        router.push("/")
                    }}>
                        Home
                    </Box>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Learn
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>

                    <Group position="center" grow pb="xl" px="md">
                        <Button onClick={() => {
                            router.push("/login");
                            closeDrawer();
                        }} variant="default">Get Started</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}