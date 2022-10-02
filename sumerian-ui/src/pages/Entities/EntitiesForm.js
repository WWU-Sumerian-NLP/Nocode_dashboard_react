import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls';

const initalValues = {
    id: 0,
    entityName: '',
    entityTag: '',
}

export default function EntitiesForm(props){
    const {addOrEdit, recordForEdit} = props

    const{
        values, 
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initalValues)

    const handleSubmit = e => {
        e.preventDefault()
        addOrEdit(values, resetForm);
    }    

    useEffect(() => {
        if(recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        }

    }, [recordForEdit])

    
    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Grid container  >            
                <Grid item xs={6}>
                    <Controls.Input
                        label="Entity Name"
                        name="entityName"
                        value={values.entityName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Entity Tag"
                        name="entityTag"
                        value={values.entityTag}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div >
                        <Controls.Button 
                            type="submit" 
                            text="Submit" 
                            >
                        </Controls.Button>
                    </div>
                </Grid>
            </Grid>
        </Form>
        </>
    )
}
