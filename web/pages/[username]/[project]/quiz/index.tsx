import {Title} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

export default function Quiz() {

    const [group, setGroup] = useState("");
    const [project, setProject] = useState("");
    let isLock = useRef(true)
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        setProject(`${router.query.username}/${router.query.project}/quiz`);
        console.log("hello");

    }, [router.isReady]);
    return (
        <>
            <Title>{project}</Title>
        </>
    )
}