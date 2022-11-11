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
                Hard to Monitor if Document reader is reading, and where is focused most often. And to make sure the
                user is not cheating, the system would be able to monitor the user through webcam. Taking the Quiz in
                person may not be always an option, so this product would be a replacement of that.
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
                <li>Document setter may set the Document by uploading it to the site</li>
                <li>Document reader may read the Document</li>
                <li>Document reader may add groups and individual user together</li>
                <li>Document reader would be monitored via webcam</li>
                <li>Document reader would know where the reader focused the most, from group and individual</li>
                <li>Document setter may change the Document</li>
                <li>Document setter may take quiz</li>
                <li>Document reader can give quiz</li>
                <li>Document reader solve the given quiz</li>
                <li>Document setter may view the quiz result</li>
                <li>Document setter may view the Document reading habits</li>

            </ul>
            <h2>2.3 User Classes and Characteristics</h2>
            <p>
                This product would be used by the Document setter and Document reader.
                This product would market toward Educational Institutions, Organizations, and Companies. Where the
                educational institution would be the Document setter and the student would be the Document reader.
            </p>
            <h2>2.4 Operating Environment</h2>
            <p>
                This product would be less effective if the user is not in a well lit room, or doesn't have a webcam. In
                a well-lit room. Also, the result of quiz and monitoring data can be viewed in phone as well as browser.
            </p>
            <h2>2.5 Design and Implementation Constraints</h2>
            <p>
                Product would maintain this Guideline:
                <a href="https://www.cdc.gov/phlp/docs/datasharing-laws.Document"> health regulation</a>[https://www.cdc.gov/phlp/docs/datasharing-laws.Document]
                of tracking user through webcam.
            </p>
            <h2>2.6 User Documentation</h2>
            <p>
                User may check <Link href="/tutorial">this page</Link> [https://nsu-read.vercel.app/tutorial] for any
                farther tutorial as it's being actively developed and things may change along the way.
            </p>
            <h2>2.7 Assumptions and Dependencies</h2>
            <p>
                This product may use some external API to make the product more effective. For API payment and for the
                needed requirement would have to be bared by the client. And father features other than the website have
                to agreed upon both client and the developer.
            </p>
        </div>
    )
}