import {Avatar, Flex, Title, Text, Grid, Container, Image, createStyles, Divider} from "@mantine/core";
import {Database} from "../../utils/database.types";
import {IconCone, IconUser} from "@tabler/icons";
import ProjectSearchList from "./ProjectSearchList";
import {useTheme} from "@emotion/react";

type Profiles = Database['public']['Tables']['profiles']['Row']
const useStyles = createStyles((theme) => ({
    ProfilePicture: {
        width: 256,
        height: 256,
        maxWidth: 256,
        borderRadius: 50,
        flexShrink: 0,
        [theme.fn.smallerThan("md")]: {
            width: 140,
            height: 140,
            maxWidth: 140,
        }
    },
    ProfileContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        }
    },

    ProfilePicText: {
        flexDirection: "column",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
        }
    }

}));
export default function Profile({profile}: { profile: Profiles }) {
    const {classes, theme} = useStyles();
    return (
        <>
            <Flex pt={"sm"} className={classes.ProfileContainer}>
                <Flex className={classes.ProfilePicText}>
                    <Image placeholder={<IconUser/>} className={classes.ProfilePicture} src={profile?.avatar_url}
                           alt="profile logo"/>
                    <Flex direction={"column"}>
                        <Title>{profile?.username}</Title>
                        <Text size={"sm"} color={"dimmed"}>{profile?.full_name}</Text>
                    </Flex>

                </Flex>
                <ProjectSearchList/>

            </Flex>
        </>
    )
}