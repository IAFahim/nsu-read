import {useState, useRef} from 'react';
import {Autocomplete, Button, Divider, Flex, Grid, Loader, Select} from '@mantine/core';

export default function ProjectSearchList() {
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
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Autocomplete
                        value={value}
                        data={data}
                        onChange={handleChange}
                        rightSection={loading ? <Loader size={16}/> : null}
                        label="Your Projects"
                        placeholder="find a project"
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Select data={["Recent", "Popularity"]} label="Sort" placeholder={"recent"}/>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Select data={["All","Self"]} label="Organization" placeholder={"All"}/>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Select data={["All", "Public", "Unlisted"]} label="Type" placeholder={"All"}/>
                </Grid.Col>
                <Grid.Col style={{alignSelf:"end"}} span={1}>
                    <Button ml={"xs"} mb={1} variant={"gradient"} >New</Button>
                </Grid.Col>
            </Grid>
            <Divider my="sm"/>
        </>
    );
}