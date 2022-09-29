import React, {useEffect, useState} from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/styles";
import Controls from "../../controls/Controls";
import "./RunRelationExtraction.css"



const RunRelationExtraction = (props) => {   
    // const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        async function runRelationExtraction() {
            console.log("running relation Extraction")
            const res = await axios.post(
                "http://localhost:8000/runRelationExtraction",
            );
            console.log(res.data);
        }
        runRelationExtraction();
    };

    return(
        <div className="form">
            <form onSubmit={handleSubmit} >
                <Controls.Button variant="contained" color="primary" size="large" type="submit" text="Run Relation Extraction">
                </Controls.Button>
            </form>
        </div>
    )
}

export default RunRelationExtraction