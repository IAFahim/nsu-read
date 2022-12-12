import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Collapse, Button, Flex} from '@mantine/core';
import React, {useEffect, useRef, useState} from 'react';
import CreateByGroupName from "./CreateByGroupName";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../utils/database.types";
import {useRouter} from "next/router";


export default function GroupShowAll() {
    const supabase = useSupabaseClient<Database>();
    const router = useRouter();
    const [data, setData]=useState([] as any[])
    useEffect(() => {
        if (!router.isReady) return;

        async function fetchGroupNames() {
            const data = await supabase.from("groups").select("name, description, created_at").eq("created_by", router.query.username);
            if (data.data) {
                // @ts-ignore
                console.log(data.data[0])
                setData(data.data);
            }
        }

        fetchGroupNames();
    }, [router.isReady]);

    const GroupSet=data.map((d) => {
        return (
            <CreateByGroupName GroupData={d}/>
        )
    });


    return (
        <>
            {GroupSet}
        </>
    );
}


