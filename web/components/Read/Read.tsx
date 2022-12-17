import React, {useEffect, useRef, useState} from 'react'

// Import Worker
import {Worker} from '@react-pdf-viewer/core';
import {Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Button, Container, Group, Tooltip} from "@mantine/core";
import {IconEdit} from "@tabler/icons";
import {Database} from "../../utils/database.types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useProfile from "../../store/UseProfile";
import router, {useRouter} from "next/router";
import useURL from "../../store/UseURL";
import {pageNavigationPlugin, RenderCurrentPageLabelProps} from '@react-pdf-viewer/page-navigation';
import CreateByGroupName from "../Group/CreateByGroupName";
import {useMouse, useWindowScroll} from "@mantine/hooks";

function Read() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const allowedFiles = ['application/pdf'];
    const supabase = useSupabaseClient<Database>();
    const router = useRouter();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const {CurrentPageLabel} = pageNavigationPluginInstance;
    const ref = useRef(1);

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
    const profile = useProfile(state => state.profiles);


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


    const x = useRef(0);
    const y = useRef(0);

    async function uploadPos() {
        if (lock.current) return;
        lock.current = true;
        setTimeout(async () => {
            if (router.query.username !== router.query.username) {
                //will add this later
            }
            const {
                data,
                error
            } = await supabase.from('pdf_position').insert([
                {
                    created_by: router.query.username,
                    project_name: router.query.project,
                    reader: profile?.username,
                    x: x.current,
                    y: y.current
                }
            ])
            console.log(x.current, y.current);
            lock.current = false;
        }, 10000)
    }

    const lock = useRef(false);

    function dots() {
        const [dataset, setDataset] = useState<any[]>([]);
        useEffect(() => {
            if (!router.isReady) return;

            async function get() {
                const {
                    data,
                    error
                } = await supabase.from('pdf_position').select('reader, x,y').eq('project_name', router.query.project).eq('created_by', router.query.username)
                if (data) {
                    console.log("TrackData:", data)
                    setDataset(data);
                }
            }

            get();
        }, [router.isReady])

        return dataset.map((item, index) => {
            return (
                <Tooltip label={item.reader}>
                    <div key={index} style={{
                        position: "absolute",
                        top: item.y,
                        left: item.x,
                        width: 40,
                        height: 10,
                        backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                        zIndex: 500,
                        opacity: 0.3
                    }}>

                    </div>
                </Tooltip>
            )
        })
    }

    return (
        <>
            {dots()}
            <Button mt={2} style={{position: "absolute", right: 10}} variant="default"
                    rightIcon={<IconEdit size={14}/>}>Edit</Button>

            <CurrentPageLabel>
                {(props: RenderCurrentPageLabelProps) => (
                    <span
                        style={{visibility: "hidden", padding: 0, margin: 0}}>{ref.current = props.numberOfPages}</span>
                )}
            </CurrentPageLabel>
            <Group onMouseMoveCapture={uploadPos} position="center" grow pt={15} onMouseMove={event => {
                x.current = event.pageX;
                y.current = event.pageY;
            }}>
                {url !== '' && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}/>
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