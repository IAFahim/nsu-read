import {Avatar, Flex, Title, Text, Grid, Container} from "@mantine/core";
import {Database} from "../../utils/database.types";
import {IconCone} from "@tabler/icons";
import ProjectSearchList from "./ProjectSearchList";

type Profiles = Database['public']['Tables']['profiles']['Row']
export default function Profile({profile}: { profile: Profiles }) {
    return (
        <>
            <Grid p={"xl"}>
                <Grid.Col span={4}>
                    <Flex>
                        <Avatar variant={"gradient"} size={"xl"} src={profile?.avatar_url} alt="profile logo"/>
                        <Flex direction={"column"} pl={"xl"}>
                            <Title>{profile?.username}</Title>
                            <Text color={"dimmed"}>{profile?.full_name}</Text>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={8}>
                    <ProjectSearchList/>
                </Grid.Col>
            </Grid>
        </>
    )
}