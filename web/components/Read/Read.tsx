import {useEffect, useRef, useState} from 'react'

// Import Worker
import {Worker} from '@react-pdf-viewer/core';
import {Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Button, Container, Group} from "@mantine/core";
import {IconEdit} from "@tabler/icons";
import {Database} from "../../utils/database.types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useProfile from "../../store/UseProfile";
import router, {useRouter} from "next/router";
import useURL from "../../store/UseURL";

function Read() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const allowedFiles = ['application/pdf'];
    const supabase = useSupabaseClient<Database>();
    const router = useRouter();

    const handleFile = async (e: { target: { files: any[]; }; }) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && allowedFiles.includes(selectedFile.type)) {
            console.log(router.query.username + "/" + router.query.project + "/");

            const data = await supabase.storage.from('pdf')
                .upload(`${router.query.username}/${router.query.projectview}/${selectedFile.name}`, selectedFile,
                    {
                        cacheControl: '3600',
                        upsert: true,
                    });

            if (data.error) {
                console.log(data.error);
            }

            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);

            reader.onloadend = (e) => {
                // @ts-ignore
                setPdfFile(e.target.result);
            }
        } else {
            // @ts-ignore
            setPdfFile('');
        }
    }


    const url = useURL((state) => state.url);
    const setURL = useURL((state) => state.setURL);

    useEffect(() => {
        if (!router.isReady) return;

        async function get() {
            const {
                data,
                error
            } = await supabase.storage.from('pdf').list(`${router.query.username}/${router.query.project}`);
            if (data && data.length > 0) {
                console.log(data[0]);
            }

            if (data && data.length > 0) {
                const fileLink = supabase.storage.from('pdf').getPublicUrl(`${router.query.username}/${router.query.project}/${data[0].name}`);
                if (fileLink) {
                    setURL(fileLink.data.publicUrl);
                    console.log(fileLink.data.publicUrl);
                }
            }
        }

        get();
    }, [router.isReady])


    return (
        <>
            <Button mt={2} style={{position: "absolute", right: 10}} variant="default"
                    rightIcon={<IconEdit size={14}/>}>Edit</Button>


            <Group position="center" grow pt={40}>
                {url !== '' && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                        <Viewer fileUrl={url}
                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                    </Worker>
                )}
            </Group>
            <form>
                <input type='file'
                    // @ts-ignore
                       onChange={handleFile}></input>

            </form>
            {url !== '' && <>No file is selected yet</>}
        </>
    );
}

export default Read;