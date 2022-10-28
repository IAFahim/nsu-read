import Link from "next/link";

export default function External_Interface_Requirements() {
    return (
        <div>
            <h1>3. External Interface Requirements</h1>
            <h2>3.1 User Interfaces</h2>
            <p>

            </p>
            <h2>3.2 Hardware Interfaces</h2>
            <p>Describe the logical and physical characteristics of each interface between the software product and the
                hardware components of the system. This may include the supported device types, the nature of the data
                and control interactions between the software and the hardware, and communication protocols to be
                used.</p>
            <h2>3.3 Software Interfaces</h2>
            <p>Describe the connections between this product and other specific software components (name and version),
                including databases, operating systems, tools, libraries, and integrated commercial components. Identify
                the data items or messages coming into the system and going out and describe the purpose of each.
                Describe the services needed and the nature of communications. Refer to documents that describe detailed
                application programming interface protocols. Identify data that will be shared across software
                components. If the data sharing mechanism must be implemented in a specific way (for example, use of a
                global data area in a multitasking operating system), specify this as an implementation constraint.</p>
            <h2>3.4 Communications Interfaces</h2>
            <p>Describe the requirements associated with any communications functions required by this product,
                including e-mail, web browser, network server communications protocols, electronic forms, and so on.
                Define any pertinent message formatting. Identify any communication standards that will be used, such as
                FTP or HTTP. Specify any communication security or encryption issues, data transfer rates, and
                synchronization mechanisms.</p>
        </div>
    )
}