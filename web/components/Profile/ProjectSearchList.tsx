import {useState, useRef} from 'react';
import {Autocomplete, Button, createStyles, Divider, Flex, Grid, Loader, Select} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'row',
        flex:"1 1000",
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

    return (
        <div>
            <Flex className={classes.container}>
                <Autocomplete
                    styles={{input: {minWidth: 250}}}
                    value={value}
                    data={data}
                    onChange={handleChange}
                    rightSection={loading ? <Loader size={16}/> : null}
                    label="Your Projects"
                    placeholder="find a project"
                    style={{flexGrow: 1}}
                />
                <Flex gap={"xs"}>
                    <Select data={["Recent", "Popularity"]} label="Sort" placeholder={"recent"}/>
                    <Select data={["All", "Self"]} label="Organization" placeholder={"All"}/>
                    <Select data={["All", "Public", "Unlisted"]} label="Type" placeholder={"All"}/>
                    <Button mb={1} mt={"xl"} variant={"gradient"}> New</Button>
                </Flex>
            </Flex>
            <Divider my={"sm"}/>
            <Flex direction={"column"}>
                <p>dsad</p>
                <p>dsad</p>
            </Flex>
        </div>
    );
}