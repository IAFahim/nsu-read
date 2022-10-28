import Link from "next/link";

export default function External_Interface_Requirements() {
    return (
        <div>
            <h1>3. External Interface Requirements</h1>
            <h2>3.1 User Interfaces</h2>
            <p>
                <Link href={"/tutorial"}>This page</Link> [https://nsu-read.vercel.app/tutorial] is the tutorial page.
                It will contain a brief description of the website and how to use it.
            </p>
            <h2>3.2 Hardware Interfaces</h2>
            <p>
                The system will be able to run on any device that can run a modern web browser. The website would use
                Rest API to communicate with the server over http. And would use SQL data base to store data. The
                website would use webcam to monitor the user.
            </p>
            <h2>3.3 Software Interfaces</h2>
            <p>
                Database: PostgreSQL
                <br/>
                Server: Node.js
                <br/>
                Frontend: React.js
                <br/>
                Backend: Express.js
                <br/>
                WebRTC: WebRTC
                <br/>
                Websocket: Socket.io
                <br/>
                Authentication: JWT
                <br/>
                PDF: pdf-viewer.js
                <br/>
            </p>
            <h2>3.4 Communications Interfaces</h2>
            <p>
                Email: Gmail
                <br/>
                Browser: Chrome, Firefox, Safari, Edge, Opera
                <br/>
                OS: Windows, Mac, Linux
                <br/>
                Protocol: HTTP, HTTPS
                <br/>
                Encryption: TLS
                <br/>
            </p>
        </div>
    )
}