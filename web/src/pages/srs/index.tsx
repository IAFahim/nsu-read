import Hero from "../../components/SRS/Hero";
import Introduction from "../../components/SRS/Introduction";
import Overall_Description from "../../components/SRS/Overall_Description";
import External_Interface_Requirements from "../../components/SRS/External_Interface_Requirements";
import System_Features from "../../components/SRS/System_Features";

export default function SRS() {
    return (
        <div style={{paddingRight:20, paddingLeft:20}}>
            <Hero/>
            <Introduction/>
            <Overall_Description/>
            <External_Interface_Requirements/>
            <System_Features/>
        </div>
    )
}
