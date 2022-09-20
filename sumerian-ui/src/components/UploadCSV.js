import React, {useState} from "react"
import './UploadCSV.css';

import axios from "axios"

const CSVData = (props) => {
    const [csvFile, setCsvFile] = useState();
    const formData = new FormData();

    if(csvFile) {
        formData.append("path_to_csv", csvFile);
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
                "http://localhost:8000/relations",
                formData,
                'mutlipart/form-data',
            );
            console.log(res.data);
        }
        fetchData();
    };

    return(
        <div className="form-box">
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" onChange={handleChange} />
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md font-semibold">fetch</button>
            </form>
        </div>
    )
}

export default CSVData