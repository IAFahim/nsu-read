import {Avatar, Overlay, Flex, Title, Text, Grid, Container, Image, createStyles, Divider, Button} from "@mantine/core";
import {Database} from "../../utils/database.types";
import {IconCone, IconUser} from "@tabler/icons";
import ProfileLists from "./ProfileLists";
import {useTheme} from "@emotion/react";
import {useState} from "react";

type Profiles = Database['public']['Tables']['users']['Row']
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
        flex: "auto",
        justifyContent: "center",
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

    const [sync, setSync] = useState(false);
    return (
        <>
            <Flex pt={"sm"} className={classes.ProfileContainer} gap={"xl"}>
                <Flex className={classes.ProfilePicText}>
                    <Image placeholder={<IconUser/>} className={classes.ProfilePicture} src={profile?.avatar_url}
                           alt="profile logo"/>
                    <Flex direction={"column"}>
                        <Title>{profile?.username}</Title>
                        <Text size={"sm"} color={"dimmed"}>{profile?.full_name}</Text>
                        <Button mt={"sm"} color={"blue"} variant={"outline"} onClick={
                            () => {
                                setSync(!sync);
                            }
                        }>Sync Phone</Button>
                        {
                            sync && <Image src={`https://image-charts.com/chart?chs=150x150&cht=qr&chl=${profile.username}`}></Image>
                        }
                    </Flex>
                </Flex>
                <ProfileLists/>

            </Flex>
        </>
    )
}