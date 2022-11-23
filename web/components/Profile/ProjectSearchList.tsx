import {useState, useRef} from 'react';
import {Autocomplete, Button, createStyles, Divider, Flex, Grid, Input, Loader, Select} from '@mantine/core';
import useProfile from "../../store/UseProfile";
import router from 'next/router';
import {IconChevronDown} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'row',
        flex: "1 1000",
        gap: theme.spacing.xs,

        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
        }
    }
}));

export default function ProjectSearchList() {
    const {classes, theme} = useStyles();
    const timeoutRef = useRef<number>(-1);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);

    const handleChange = (val: string) => {
        window.clearTimeout(timeoutRef.current);
        setValue(val);
        setData([]);

        if (val.trim().length === 0 || val.includes('@')) {
            setLoading(false);
        } else {
            setLoading(true);
            timeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                setData(['srs read']);
            }, 1000);
        }
    };

    const profile = useProfile(state => state.profiles);

    return (
        <div>
            <Flex className={classes.container}>
                <Autocomplete
                    styles={{input: {minWidth: 230}}}
                    value={value}
                    data={data}
                    onChange={handleChange}
                    rightSection={loading ? <Loader size={16}/> : null}
                    label="Projects"
                    placeholder="Find a project"
                    style={{flexGrow: 1}}
                />
                <Flex gap={"xs"}>
                    <Input.Wrapper label="Sort">
                        <Input component="select" rightSection={<IconChevronDown size={14} stroke={1.5}/>}>
                            <option value="Recent">Recent</option>
                            <option value="Popularity">Popularity</option>
                        </Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Organization">
                        <Input component="select" rightSection={<IconChevronDown size={14} stroke={1.5}/>}>
                            <option value="All">All</option>
                            <option value={`${profile?.username}`}>{profile?.username}</option>
                        </Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Type">
                        <Input component="select" rightSection={<IconChevronDown size={14} stroke={1.5}/>}>
                            <option value="All">All</option>
                            <option value="Public">Public</option>
                            <option value="Unlisted">Unlisted</option>
                        </Input>
                    </Input.Wrapper>
                    <Button mb={1} mt={"xl"} variant={"gradient"} onClick={() => {
                        router.push(profile?.username + "/new");
                    }}> New</Button>
                </Flex>
            </Flex>
            <Divider my={"sm"}/>
            <Flex direction={"column"}>
            </Flex>
        </div>
    );
}