import {
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    createStyles,
    Divider,
    Drawer,
    Group,
    Header,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    Title,
    UnstyledButton,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown, IconCode, IconHelp, IconRelationOneToMany,} from '@tabler/icons';
import {useRouter} from "next/router";
import NSUReadLogo from "./NSUReadLogo.svg";
import Image from "next/image";
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {Database} from "../../utils/database.types";
import {useEffect, useState} from "react";
import useProfile from "../../store/UseProfile";

type Profiles = Database['public']['Tables']['users']['Row']


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
    const session = useSession()
    const supabase = useSupabaseClient<Database>();

    const links = mockdata.map((item) => (

        <UnstyledButton key={item.title} className={classes.subLink} onClick={() => {
            router.push(item.link).then(closeDrawer);
        }}>
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
    ));

    const isLoggedIn = useProfile(state => state.isLoggedIn);
    const SetLoggedIn = useProfile(state => state.SetLoggedIn);

    useEffect(() => {
        SetLoggedIn(session != null);
    }, [session]);

    const SetProfiles= useProfile(state => state.SetProfiles);
    const toggleLogin = () => {
        if (session) {
            router.push("/").then(() => {
                supabase.auth.signOut().then(() => {
                    SetProfiles(null);
                    SetLoggedIn(false);
                });
            })
        } else {
            router.push("/login")
        }
    }

    return (
        <Box>
            <Header height={60} px="md">
                <Group position="apart" sx={{height: '100%'}}>
                    <Center inline style={{userSelect: "none"}}>
                        <Image src={NSUReadLogo} height={30} width={30} alt={"profile_picture_of_someone_awesome"}/>
                        <Title>SU-Read</Title>
                    </Center>
                    <Group sx={{height: '100%'}} spacing={0} className={classes.hiddenMobile}>
                        <Box className={classes.link} component="span" mr={5} onClick={() => {
                            router.push("/")
                        }}>
                            Home
                        </Box>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Center inline className={classes.link}>
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
                            toggleLogin()
                        }} variant={!isLoggedIn ? "filled" : "default"}
                                color="dark">{!isLoggedIn ? "Get Started" : "Logout"}</Button>
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
                        router.push("/").then(closeDrawer);
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
                            toggleLogin();
                            closeDrawer();
                        }} variant={!isLoggedIn ? "filled" : "default"}
                                color="dark">{!isLoggedIn ? "Get Started" : "Logout"}</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}