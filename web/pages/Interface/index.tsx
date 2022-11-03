import Hero from "../../components/SRS/Hero";
import Introduction from "../../components/SRS/Introduction";
import System_Features from "../../components/SRS/System_Features";

export default function Interface() {
    return (
        <div style={{paddingRight:20, paddingLeft:20}}>
            <Hero/>
            <Introduction/>
            <System_Features/>
        </div>
    )
}
