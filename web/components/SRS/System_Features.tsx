export default function System_Features() {
    return (
        <div>
            <h1>4. System Features</h1>

            <h4>Browser User</h4>
            <ul>
                <li>Create an account</li>
                <li>Login</li>
                <li>View the list of project</li>
                <li>Create a reading project</li>
                <li>Set/Read PDF</li>
                <li>Readers gets monitored with there consent for statistical data</li>
                <li>View Readers statistical data</li>
                <li>Set/Participate in quiz</li>
                <li>See quiz result, modify answer, publish marks</li>
            </ul>
            <h4>Phone User</h4>
            <ul>
                <li>Create an account</li>
                <li>Login</li>
                <li>View the list of project</li>
                <li>View Readers statistical data</li>
                <li>See quiz result</li>
            </ul>

            <p>This SRS is for NSU-read Service version 1.0.0. This SRS describes the entire system.</p>

            <h2>4.1 Create an account</h2>
            <dl>
                <dt><b>4.1.1</b> Create account with Google Auth</dt>
                <dt><b>4.1.2</b> Set User Name, Profile Picture, Organization</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to have a google Account to login</code><br/></dd>
            </dl>
            <h2>4.2 login</h2>
            <dl>
                <dt><b>4.2.1</b> Login with Google Auth</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to have a google Account to login</code><br/></dd>
            </dl>
            <h2>4.3 View the list of reading project</h2>
            <dl>
                <dt><b>4.3.1</b> View reading project of other user</dt>
                <dt><b>4.3.2</b> Click on project you would like to join</dt>
            </dl>
            <h2>4.4 Create a reading project</h2>
            <dl>
                <dt><b>4.4.1</b> Create A reading project with (optional PDF)</dt>
                <dt><b>4.4.2</b> Project can be totally empty</dt>
                <dt><b>4.4.3</b> Unlisted user can only view the project structures and description</dt>
                <dt><b>4.4.4</b> Project can be set to private</dt>
                <dt><b>4.4.5</b> Project can be set to public</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
            </dl>
            <h2>4.5 Set/Read PDF</h2>
            <dl>
                <dt><b>4.5.1</b> Set PDF by uploading the PDF</dt>
                <dt><b>4.5.2</b> Read PDF</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
                <dd><code>REQ-2: Need to be a member of the project</code><br/></dd>
            </dl>
            <h2>4.6 Readers gets monitored with there consent for statistical data</h2>
            <dl>
                <dt><b>4.6.1</b> Readers gets monitored with there consent for statistical data</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
                <dd><code>REQ-2: Need to be a member of the project</code><br/></dd>
                <dd><code>REQ-3: If Project is set to monitor you would be monitored using a webcam</code><br/></dd>
                <dd><code>REQ-4: need both Project setter and readers permission to be monitored</code><br/></dd>
            </dl>
            <h2>4.7 View Readers statistical data</h2>
            <dl>
                <dt><b>4.7.1</b> View Readers statistical data</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
                <dd><code>REQ-2: Need to be a owner of the project</code><br/></dd>
            </dl>
            <h2>4.8 Set/Participate in quiz</h2>
            <dl>
                <dt><b>4.8.1</b> Project Owner can Set quiz</dt>
                <dt><b>4.8.2</b> Members can participate in quiz</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
                <dd><code>REQ-2: Need to be a member of the project</code><br/></dd>
            </dl>
            <h2>4.9 See quiz result, modify answer, publish marks</h2>
            <dl>
                <dt><b>4.9.1</b> Project owner can set the quiz</dt>
                <dt><b>4.9.2</b> Project owner can modify answer</dt>
                <dt><b>4.9.3</b> Project owner can publish marks</dt>
                <dt><b>4.9.4</b> Project member can view publish marks</dt>
                <dd><b>Functional Requirements</b></dd>
                <dd><code>REQ-1: Need to be logged in</code><br/></dd>
                <dd><code>REQ-2: Need to be a owner of the project</code><br/></dd>
            </dl>
        </div>
    )
}