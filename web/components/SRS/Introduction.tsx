import Link from "next/link";

export default function Introduction() {
    return (
        <div id="Introduction">
            <h1>1. Introduction</h1>
            <h2>1.1 Purpose</h2>
            <p>This SRS covers A Document reading system for an organization as reading task. The product would be used to assign task to reader and its purpose to monitor its user and take quiz by the Document setter</p>
            <h2>1.2 Document Conventions</h2>
            <p>The document doesn't follow any conventions. Here, every requirement statement is to have its own priority.</p>
            <h2>1.3 Intended Audience and Reading Suggestions</h2>
            <p>This document is mainly written for the Client, Manager, designer, Programmer Tester and End User.</p>
            <h2>1.4 Product Scope</h2>
            <p>In this product, document setter and Document reader both can be partaken. The Document setter may set the document by uploading it to the site, after that the system would monitor the Document reader's movement View Webcam to vary that the user is paying attention added with on which page of each section the Document reader is reading the most. Farther more to test the Document reader's attention Quiz maybe taken in written from, MCQ, Fill in the Blanks, Voice assisted question answer. And To maintain groups, the Document reader may task and add groups and individual user together.</p>
            <h2>1.5 References</h2>
            <p>
                User may check <Link href="/srs">this page</Link> [https://nsu-read.vercel.app/srs] for any farther update to this document.
                <br/>
                Client, Manager, designer, Programmer Tester and End User may benefit from reading this document fully.
                <br/>
                End User may benefit from reading <a href="src/components/SRS/Introduction#Overall_Description">Overall Description</a>
            </p>
        </div>
    )
}