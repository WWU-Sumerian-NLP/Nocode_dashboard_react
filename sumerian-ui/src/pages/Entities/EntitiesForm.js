import React, {useState, useEffect} from 'react'
import CSVData from '../../components/UploadCSV';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {useForm, Form} from '../../components/useForm';
import Button from "@material-ui/core/Button";
import './EntitiesForm.css';



const initalValues = {
    id: 0,
    entityName: '',
    entityTag: '',
}

export default function EntitiesForm(){

    const{
        values, 
        setValues,
        handleInputChange
    } = useForm(initalValues)


    useEffect(() => {

    }, [])

    return (
        <>
        <Form>
            <Grid container  >            
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Entity Name"
                        name="entityName"
                        value={values.entityName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Entity Tag"
                        name="entityTag"
                        value={values.entityTag}
                    />
                </Grid>
                <div className='material-ui-button'>
                <Button variant="contained" color="primary" size="large" type="submit">
                    Submit
                </Button>
                </div>
            </Grid>

            
        </Form>
        </>
    )
}
