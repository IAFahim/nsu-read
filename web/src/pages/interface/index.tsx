import Hero from "../../components/srs/Hero";
import Introduction from "../../components/srs/Introduction";
import System_Features from "../../components/srs/System_Features";

export default function SRS() {
    return (
        <div style={{paddingRight:20, paddingLeft:20}}>
            <Hero/>
            <Introduction/>
            <System_Features/>
        </div>
    )
}
