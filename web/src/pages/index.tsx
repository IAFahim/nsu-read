import Link from "next/link";

export default function Home() {
    return (
        <div style={{paddingRight: 20, paddingLeft: 20}}>
            <h1 style={{textAlign:"center"}}>Only SRS is available. <Link href={"/srs"}>SRS</Link></h1>
        </div>
    )
}
