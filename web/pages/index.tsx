import Introduction from "../components/srs/Introduction";
import System_Features from "../components/srs/System_Features";
import Overall_Description from "../components/srs/Overall_Description";
import External_Interface_Requirements from "../components/srs/External_Interface_Requirements";
import Hero from "../components/srs/Hero";

export default function SRS() {
    return (
        <>
            <Hero/>
            <Introduction/>
            <Overall_Description/>
            <External_Interface_Requirements/>
            <System_Features/>
        </>
    )
}
