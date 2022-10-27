import * as React from 'react';
import {SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDF = () => {
    function setLayer() {
        return document.getElementsByClassName("rpv-core__text-layer").length;
    }

    return (
        <>
        </>
    );
};

export default PDF;