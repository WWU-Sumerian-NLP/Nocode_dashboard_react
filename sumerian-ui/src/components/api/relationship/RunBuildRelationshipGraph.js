import React, {useEffect, useState} from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/styles";
import Controls from "../../controls/Controls";
import "./RunBuildRelationshipGraph.css"



const RunBuildRelationshipGraph = (props) => {   
    // const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        async function runBuildRelationshipGraph() {
            console.log("running relation Extraction")
            const res = await axios.post(
                "http://localhost:8000/runBuildRelationshipGraph",
            );
            console.log(res.data);
        }
        runBuildRelationshipGraph();
    };

    return(
        <div className="form">
            <form onSubmit={handleSubmit} >
                <Controls.Button variant="contained" color="primary" size="large" type="submit" text="Build Knowledge Graph">
                </Controls.Button>
            </form>
        </div>
    )
}

export default RunBuildRelationshipGraph