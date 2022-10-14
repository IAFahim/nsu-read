import type {NextPage} from 'next'
import {useState} from "react";

const Home: NextPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }
    function getPDF(){
        return "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
    return (
        <>
        </>
    )
}

export default Home
