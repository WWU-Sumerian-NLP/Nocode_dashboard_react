import React, {useEffect, useState} from "react"
import './UploadEntities.css';

import axios from "axios"
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import Controls from "../../controls/Controls";

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: '8px',
        }
    },
    input: {
        display: "none"
    },

});




const UploadEntities = (props) => {
    const {endpoint, setEndpoint} = props;

    const [csvFile, setCsvFile] = useState();
    const formData = new FormData();
    const classes = useStyles();

    if(csvFile) {
        formData.append("path_to_entity_csv", csvFile);
    }

    const handleChange = (e) => {
        if(e.currentTarget.files) {
            setCsvFile(e.currentTarget.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            console.log("fetching")
            const res = await axios.post(
                "http://localhost:8000/insertEntities",
                formData,
                'mutlipart/form-data',
            );
            console.log(res.data);
        }
        fetchData();
    };

    useEffect(() => {

    }, [setEndpoint])

    return(
        <div className="form-box">
            <form onSubmit={handleSubmit} >
                <input 
                    type="file" 
                    accept=".tsv" 
                    onChange={handleChange}  
                    className={classes.input}
                    id="raised-button-file"
                    />
                <label htmlFor="raised-button-file">
                    <Button accept=".tsv" variant="contained" component="span" color="primary" size="large" type="file" text="Upload">
                    Upload
                    </Button>
                </label>
                <Controls.Button variant="contained" color="primary" size="large" type="submit" text="Submit">
                </Controls.Button>
            </form>
        </div>
    )
}

export default UploadEntities