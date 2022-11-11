import Link from "next/link";

export default function Other_Nonfunctional_Requirements() {
    return (
        <div>
            <h1>5. Other Nonfunctional Requirements</h1>
            <h2>5.1 Performance Requirements</h2>
            <p>
                The product would have to be able to handle a large number of users at the same time. Without making it
                feel bulky so that the user can use it easily.
                To achieve this we will handle the face recognition on user side once per second. And will send the data
                to the server only when the user is not reading.
            </p>
            <h2>5.2 Safety Requirements</h2>
            <p>
                For the user to feel safe we wont store user video data. We will only store the user name and email.
                User can have a profile pictures which we would use to variety if the user is the one reading the
                Document. We will also use JWT for authentication. We will also use TLS for encryption.
            </p>
            <h2>5.3 Security Requirements</h2>
            <p>
                We will use JWT for authentication. We will also use TLS for encryption.
            </p>
            <h2>5.4 Software Quality Attributes</h2>
            <p>
                The system will be able to run on any device that can run a modern web browser. The website would use
                Rest API to communicate with the server over http. And would use SQL data base to store data. The
                website would use webcam to monitor the user.
            </p>
            <h2>5.5 Business Rules</h2>
            <p>
                Document setter can only set Document, take quiz, and View reader statistics for better understanding to user to import upon there material or to mark inactive personal so that they can insure the end user gets benefited by the Document most.
                Document reader can only read Document files, and quiz can only be taken on Document files.
            </p>
        </div>
    )
}