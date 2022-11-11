import {Avatar} from "@mantine/core";
import {Database} from "../../utils/database.types";

type Profiles = Database['public']['Tables']['profiles']['Row']
export default function Profile({profile}: { profile: Profiles }) {
    return (
        <>
            <h1>{profile?.username}</h1>
            <p>{profile?.full_name}</p>
            <Avatar style={{borderRadius: "100%"}} size={"xl"} src={profile?.avatar_url} alt="profile logo"/>
            <p>{profile?.avatar_url}</p>
        </>
    )
}