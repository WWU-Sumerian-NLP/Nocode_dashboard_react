import React, {useEffect, useState} from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/styles";
import Controls from "../../controls/Controls";
import "./RunEntityExtraction.css"



const RunEntityExtraction = (props) => {   
    // const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        async function runEntityExtraction() {
            console.log("running entity Extraction")
            const res = await axios.post(
                "http://localhost:8000/runEntityExtraction",
            );
            console.log(res.data);
        }
        runEntityExtraction();
    };

    return(
        <div className="form">
            <form onSubmit={handleSubmit} >
                <Controls.Button variant="contained" color="primary" size="large" type="submit" text="Run Entity Extraction">
                </Controls.Button>
            </form>
        </div>
    )
}

export default RunEntityExtraction