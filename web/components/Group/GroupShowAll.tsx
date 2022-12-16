import {
    Avatar,
    Table,
    Group,
    Text,
    ActionIcon,
    Menu,
    ScrollArea,
    Collapse,
    Button,
    Flex,
    Input,
    MultiSelect, Container, TransferListItem
} from '@mantine/core';
import React, {useEffect, useRef, useState} from 'react';
import CreateByGroupName from "./CreateByGroupName";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../utils/database.types";
import {useRouter} from "next/router";


export default function GroupShowAll() {
    const supabase = useSupabaseClient<Database>();
    const router = useRouter();
    const [data, setData]=useState([] as any[])

    const [allGroups, setAllGroups] = useState([] as TransferListItem[]);

    useEffect(() => {
        if (!router.isReady) return;

        async function fetchGroupNames() {
            const data = await supabase.from("project_groups").select(" *, groups!inner(created_by)").eq("created_by", router.query.username).eq("project_name", router.query.project);
            if (data.data) {
                setData(data.data);
            }

        }

        async function FetchAllGroups() {
            const data = await supabase.from("groups").select("*").eq("created_by", router.query.username);
            if(data.data){
                setAllGroups(data.data.map(function (element) {
                    let obj = {
                        label: element.name,
                        value: element.name,
                        description: element.description,
                    }
                    console.log(obj, element)
                    return obj
                }))
            }
        }

        fetchGroupNames();
        FetchAllGroups();
    }, [router.isReady]);

    const GroupSet=data.map((d) => {
        return (
            <CreateByGroupName GroupData={d}/>
        )
    });

    const [selectedGroups, setSelectedGroups] = useState([] as string[]);


    return (
        <Container>
            <Flex>

            <MultiSelect
                label="Add groups"
                placeholder="group name"
                style={{flexGrow: 1}}
                data={allGroups}
                value={selectedGroups}
                onChange={setSelectedGroups}
                searchable
                clearable
                nothingFound="Nobody here"
                maxDropdownHeight={400}
                filter={(value, selected, item) =>
                    !selected && item.label &&
                    (item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                        item.description.toLowerCase().includes(value.toLowerCase().trim()))
                }
            />
            <Button mt={"xl"} ml={"md"}
                    onClick={async () => {
                        let groups= selectedGroups.map(function (element) {
                            let obj = {
                                group_name: element,
                                project_name: router.query.project,
                                created_by: router.query.username
                            }
                            return obj
                        })

                        const {data, error} = await supabase.from("project_groups").insert(groups);
                        if (error) {
                            console.log(error);
                        }
                        if (data) {
                            console.log(data);
                            router.reload();
                        }

                    }}
            >Add</Button>
            </Flex>
            {GroupSet}

        </Container>
    );
}


