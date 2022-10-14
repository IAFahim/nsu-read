import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import {NextPage} from "next";

const PDF: NextPage=()=> {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function onDocumentLoadError({ message }) {
        console.error(message);
    }

    return (
        <div>
            <Document file="sample.pdf" onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}

export default PDF;