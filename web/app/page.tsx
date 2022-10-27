import "./index.css"
import Introduction from "./Introduction";
import Overall_Description from "./Overall_Description";
import External_Interface_Requirements from "./External_Interface_Requirements";
import System_Features from "./System_Features";

export default function SRS() {
    return (
        <>
            <Introduction/>
            <Overall_Description/>
            <External_Interface_Requirements/>
            <System_Features/>
        </>
    )
}