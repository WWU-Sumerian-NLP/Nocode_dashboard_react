import axios from "axios"
import './RunPipeline.css';
import { Button } from "@material-ui/core";
import Controls from "../../controls/Controls";

const RunPipeline = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        async function runPipeline() {
            console.log("running pipeline")
            const res = await axios.post(
                "http://localhost:8080/pipeline",
            );
        }
        runPipeline();
    };

    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
            
            <Controls.Button text="Build Knowledge Graph" type="submit" variant="contained" className="bg-blue-500 px-4 py-2 rounded-md font-semibold">run pipeline
            </Controls.Button>
            </form>
        </div>
    )
}
export default RunPipeline