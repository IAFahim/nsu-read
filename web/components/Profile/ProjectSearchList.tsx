import {useState, useRef, useEffect, forwardRef} from 'react';
import {
    Autocomplete,
    Avatar,
    Button,
    createStyles,
    Divider,
    Flex,
    Grid,
    Group,
    Input,
    Loader,
    Select, Text
} from '@mantine/core';
import useProfile from "../../store/UseProfile";
import router from 'next/router';
import {IconChevronDown} from "@tabler/icons";
import CreateNew from "../Button/CreateNew";
import {Database} from "../../utils/database.types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {placeholder, PLACEHOLDERS_ALIAS} from "@babel/types";
import {jsx} from "@emotion/react";
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;

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
type Project = Database['public']['Tables']['projects']['Row'];

function ProjectLists(props: { projects: Project[] }) {
    const list = props.projects.map(p => {
        return (
            <ProjectList
                key={p.name}
                // @ts-ignore
                project={p}/>
        )
    })
    return (
        <div>
            {list}
        </div>
    )
}


function ProjectList(props: { project: Project }) {
    console.log(props.project)
    return (
        <div>
            <Group noWrap onClick={()=>{
                router.push(`${props.project.id}/${props.project.name}`)
            }
            }>
                <Text>{props.project.name}</Text>
                <div>
                    <Text>{props.project.description}</Text>
                    <Text size="xs" color="dimmed">
                        {props.project.type}
                    </Text>
                </div>
            </Group>
        </div>
    )
}

export default function ProjectSearchList() {
    const projectReq = useSupabaseClient<Database>()
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
    const lock = useRef(true);
    const [projectList, setProjectList] = useState([] as Project[]);

    useEffect(() => {
        async function fetchProfile() {
            if (lock.current) {
                lock.current = false;
                const project = await projectReq.from("projects").select("*").eq("id", profile?.id);
                if (project.data) {
                    setProjectList(project.data);
                }
                // console.log(project.data);
            }
        }

        fetchProfile();
    }, [])


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
                    <CreateNew/>
                </Flex>
            </Flex>
            <Divider my={"sm"}/>
            <Flex direction={"column"}>
                <ProjectLists projects={projectList}/>
            </Flex>
        </div>
    );
}