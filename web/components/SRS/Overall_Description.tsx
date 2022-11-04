import Image from "next/image";
import Link from "next/link";

export default function Overall_Description() {
    return (
        <div id="Overall_Description">
            <h1>2. Overall Description</h1>
            <h2>2.1 Product Perspective</h2>
            <p>
                This product is replacement of real world monitoring problem of document distribution and making sure
                the
                reader follows on, or to identify reading trends amount the users.
                <br/>
                <Image src="/problem_without_this_software.png" alt="problem_without_this_software" width={960}
                       height={416} style={{
                    marginTop: 10,
                }}/>
                <br/>
                <br/>
                Assign Material to the user and monitor the user reading habits and take quiz to test the user attention
                Hard to Monitor if PDF reader is reading, and where is focused most often. And to make sure the user is
                not cheating the system would be able to monitor the user through webcam.
                Taking Quiz in person may not be always an option, so this product would be a replacement of that.
                <br/>
                This product would be able to monitor the user reading habits and take quiz to test the user attention.
                <br/>
                <Image src="/and_with_this_software.png" alt="and_with_this_software.png" width={960}
                       height={416} style={{
                    marginTop: 10,
                }}/>
                <br/>
            </p>
            <h2>2.2 Product Functions</h2>
            <p>
                Task this product would be able to do:
            </p>
            <ul>
                <li>PDF setter may set the PDF by uploading it to the site</li>
                <li>PDF reader may read the PDF</li>
                <li>PDF reader may add groups and individual user together</li>
                <li>PDF reader would be monitored via webcam</li>
                <li>PDF reader would know where the reader focused the most, from group and individual</li>
                <li>PDF setter may change the PDF</li>
                <li>PDF setter may take quiz</li>
                <li>PDF reader can give quiz</li>
                <li>PDF reader solve the given quiz</li>
                <li>PDF setter may view the quiz result</li>
                <li>PDF setter may view the PDF reading habits</li>

            </ul>
            <h2>2.3 User Classes and Characteristics</h2>
            <p>
                This product would be used by the PDF setter and PDF reader.
                <br/>
                This product would marketed toward Educational Institution, Organization, and Company. where the
                educational institution would be the PDF setter and the student would be the PDF reader.
            </p>
            <h2>2.4 Operating Environment</h2>
            <p>
                This product would be used in any device with a browser, internet connection, and webcam. In a well-lit
                room.
                Also the result of quiz and monitoring data can be viewed in phone as well as browser.
            </p>
            <h2>2.5 Design and Implementation Constraints</h2>
            <p>
                This product would be less effective if user is not in a well lit room, or doesnt have a webcam. And it
                would martian this
                <a href="https://www.cdc.gov/phlp/docs/datasharing-laws.pdf">health regulation</a>[https://www.cdc.gov/phlp/docs/datasharing-laws.pdf]
                of tracking user
                through webcam.
            </p>
            <h2>2.6 User Documentation</h2>
            <p>
                User may check <Link href="/tutorial">this page</Link> [https://nsu-read.vercel.app/tutorial] for any
                farther tutorial as its being actively developed
                and things may change along the way.
            </p>
            <h2>2.7 Assumptions and Dependencies</h2>
            <p>
                This product may use some external API to make the product more effective. This payment and requirement
                would have to be bared by the client. And father recurse other then the website have to agreed upon both
                client and the developer.
            </p>
        </div>
    )
}