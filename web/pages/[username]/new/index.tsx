import {Autocomplete, Button, Container, Divider, Flex, Group, Input, Space, Textarea, Title} from "@mantine/core";
import FindPeople from "../../../components/Profile/FindPeople";
import SelectProjectType from "../../../components/Radio/SelectProjectType";
import useProjects from "../../../store/UseProjects";
import {useRef} from "react";


export default function CreateNewProjectPage() {

    const createProject = async () => {
        console.log("create project")
    }
    const {name, description, type, users} = useProjects(state => state);
    const refName = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLTextAreaElement>(null);
    const SetName = useProjects(state => state.SetName);
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
            />
            <Space h={"xl"}/>
            <SelectProjectType/>
            <Space h={"xl"}/>
            <FindPeople/>
        </Container>
    )
}