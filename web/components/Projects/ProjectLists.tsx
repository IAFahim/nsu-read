import {Database} from "../../utils/database.types";
import {Group, Text} from "@mantine/core";
import router, {useRouter} from "next/router";
import useProfile from "../../store/UseProfile";
import {useEffect, useRef, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

type Project = Database['public']['Tables']['projects']['Row'];


export default function ProjectLists() {
    const supabase = useSupabaseClient<Database>();
    const profile = useProfile(state => state.profiles);
    const lock = useRef(true);
    const [projectList, setProjectList] = useState([] as Project[]);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        async function fetchProfile() {
            if (lock.current) {
                lock.current = false;
                const project = await supabase.from("projects").select("*").eq("created_by", router.query.username? router.query.username: profile?.username );
                if (project.data) {
                    setProjectList(project.data);
                }
                // console.log(project.data);
            }
        }

        fetchProfile();

    }, [router.isReady])

    const list = projectList.map(p => {
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
            <Group noWrap onClick={() => {
                router.push(`${props.project.created_by}/${props.project.name}`)
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