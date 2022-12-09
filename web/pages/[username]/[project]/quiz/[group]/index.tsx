import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Text} from "@mantine/core";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../../../../utils/database.types";

export default function Quiz() {
    const supabase = useSupabaseClient<Database>();
    const [quiz, setQuiz] = useState("");
    const router = useRouter();
    const lock = useRef(true);
    useEffect(() => {
        if (!router.isReady) return;
        async function fetchQuizForGroup(){
            if (lock.current) {
                lock.current = false;
                // const project = await supabase.from("projects").select("*").eq("created_by", profile?.username);
                // if (project.data) {
                //     console.log(project.data);
                // }
            }
        }
        setQuiz(`${router.query.username}/${router.query.project}/quiz/${router.query.group}`);
        console.log("hello");

    }, [router.isReady]);
    return (
        <>
            <Text>{quiz}</Text>
        </>
    )
}