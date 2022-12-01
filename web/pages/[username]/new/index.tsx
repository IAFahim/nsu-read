import {Autocomplete, Button, Container, Divider, Flex, Group, Input, Space, Textarea, Title} from "@mantine/core";
import FindPeople from "../../../components/Profile/FindPeople";
import SelectProjectType from "../../../components/Radio/SelectProjectType";
import useProjects from "../../../store/UseProjects";
import {useEffect, useRef} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../../utils/database.types";
import useProfile from "../../../store/UseProfile";

type Project = Database['public']['Tables']['projects']['Row'];
export default function CreateNewProjectPage() {
    const {name, description, type, users} = useProjects(state => state);
    const profile = useProfile(state => state.profiles);
    const supabase = useSupabaseClient<Database>()
    const createProject = async () => {
        const data =await supabase.from("projects").insert({
            id: profile?.id,
            name: name,
            description: description,
            type: type,
        });
        console.log(name, description, type, users)
    };


    const refName = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLTextAreaElement>(null);

    const SetName = useProjects(state => state.SetName);
    const SetType = useProjects(state => state.SetType);
    const SetDescription = useProjects(state => state.SetDescription);



    return (
        <Container pt={"xl"}>
            <h2>Create A new Project</h2>
            <Flex direction={"row"} justify={"space-between"}>
                <Input.Wrapper style={{flexGrow: 1}} withAsterisk label="Project Name">
                    <Input ref={refName} onChange={() => {
                        SetName(`${refName.current?.value}`)
                    }}/>
                </Input.Wrapper>
                <Group position={"right"}>
                    <Button onClick={createProject} ml={"xl"} mt={"xl"} variant={"gradient"}>Create</Button>
                </Group>
            </Flex>
            <Textarea
                ref={refDescription}
                placeholder="Description"
                label="Project description (optional)"
                onChange={() => {
                    SetDescription(`${refDescription.current?.value}`)
                }}
            />
            <Space h={"xl"}/>
            <SelectProjectType/>
            <Space h={"xl"}/>
            <FindPeople/>
        </Container>
    )
}