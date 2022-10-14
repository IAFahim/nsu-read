import * as React from 'react';
import {SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const HomePage = () => {
    const getToPageFatso = () => {
        return defaultLayoutPlugin({

        });
    }
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <div
                style={{
                    width:1000,
                    height:"100vh"
            }}
            >
                <Viewer fileUrl={"https://oeaiejocbhwsbqmweqhx.supabase.co/storage/v1/object/public/pdf/sample.pdf?t=2022-10-14T20%3A36%3A59.092Z"}
                        plugins={[getToPageFatso()]}
                        defaultScale={SpecialZoomLevel.PageWidth}
                        initialPage={3}
                        onPageChange={(e)=>{
                            console.debug(e.doc);
                        }}

                />
            </div>
        </Worker>
    );
};

export default HomePage;