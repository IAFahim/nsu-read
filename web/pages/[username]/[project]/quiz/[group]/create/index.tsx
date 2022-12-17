import {Ref, SetStateAction, useRef, useState} from "react";
import {Button, Container, Input, Title, Text, Group, Textarea, Select} from "@mantine/core";
import RecordAudio from "../../../../../../components/Audio/RecordAudio";
import {IconDeviceAudioTape, IconMicrophone, IconRecordMail} from "@tabler/icons";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../../../../../../utils/database.types";
import {useRouter} from "next/router";

export default function Quiz() {
    const [question, SetQuestions] = useState("");
    const [answer, SetAnswers] = useState("");

    const [OpA, SetOpA] = useState("");
    const [OpB, SetOpB] = useState("");
    const [OpC, SetOpC] = useState("");
    const [OpD, SetOpD] = useState("");


    const [questions, setQuestions] = useState([] as any[]);

    let quiz = questions.map((item, index) => {
        return (
            <div>
                <Text pt={"md"} style={{fontWeight: 800}}>Question {index + 1}</Text>
                <Group>
                    <Text style={{fontWeight: 600}}>Question: </Text>
                    <Text>{item.question}</Text>
                </Group>
                <Group>
                    <Text>Answer: </Text>
                    <Text color={"dimmed"}>{item.answer}</Text>
                </Group>
            </div>
        )
    })

    function Written() {
        return (
            <>
                <Text>Answer:</Text>
                <Input value={answer} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                    SetAnswers(e.currentTarget.value)
                }}></Input>
            </>
        )
    }

    function MCQ() {
        return (
            <>
                <Text>Options:</Text>
                <Group grow>
                    <Input placeholder={"A"} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                        SetOpA(e.currentTarget.value)
                    }}></Input>
                    <Input placeholder={"B"} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                        SetOpB(e.currentTarget.value)
                    }}></Input>
                </Group>
                <Group grow pt={"xs"}>
                    <Input placeholder={"C"} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                        SetOpC(e.currentTarget.value)
                    }}></Input>
                    <Input placeholder={"D"} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                        SetOpD(e.currentTarget.value)
                    }}></Input>
                </Group>
                <Text>Answer</Text>
                <Select
                    transition="pop-bottom-left"
                    data={[
                        {value: 'a', label: 'A'},
                        {value: 'b', label: 'B'},
                        {value: 'c', label: 'C'},
                        {value: 'd', label: 'D'},
                    ]}></Select>
            </>
        )
    }

    function Audio() {
        return (
            <>
                <Group>
                    <Text>Question:</Text>
                    <IconMicrophone style={{cursor: "pointer"}}/>
                </Group>

                <Group>
                    <Text>Answer:</Text>
                    <IconMicrophone style={{cursor: "pointer"}}/>
                </Group>
            </>
        );
    }

    const [type, SetType] = useState();
    const router=useRouter();

    const supabase = useSupabaseClient<Database>();
    async function publish() {
        // created_by: router.query?.username,
        //     project_name: router.query?.project,
        //     group_name: router.query?.group,
    }

    return (
        <Container>
            <Title>CurrentView</Title>
            {questions.length !== 0 ? quiz : <Text color={"dimmed"}>Nothing to show</Text>}

            <Title pt={"md"}>Add</Title>
            <Select
                // @ts-ignore
                onChange={SetType}
                label="Select Question Type"
                placeholder="Pick one"
                data={[
                    {value: 'written', label: 'Written'},
                    {value: 'mcq', label: 'MCQ'},
                    {value: 'audio', label: 'Audio'},
                ]}
            />

            <Text>Question:</Text>

            <Textarea value={question} onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                SetQuestions(e.currentTarget.value)
            }}></Textarea>

            {type === "written" && Written()}
            {type === "mcq" && MCQ()}
            {type === "audio" && Audio()}


            <Button mt={"md"} onClick={() => {
                setQuestions([...questions, {question, answer, type}])
            }}>Add Question</Button>

            <Button mt={"md"} ml={"md"} variant={"outline"} onClick={() => {
                setQuestions([...questions, {question, answer}])
                publish()
            }}>Publish</Button>
        </Container>
    );
}