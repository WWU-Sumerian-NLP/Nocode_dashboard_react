import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls';

const initalValues = {
    id: 0,
    relationType: '',
    subjectTag: '',
    objectTag: '',
    regexRules: '',
    tags: '',
}

export default function RelationForms(props){
    const {addOrEdit, recordsForEdit} = props

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
        if(recordsForEdit != null){
            setValues({
                ...recordsForEdit
            })
        }
    }, [recordsForEdit])

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Grid container  >            
                <Grid item xs={6}>
                    <Controls.Input
                        label="Relation Type"
                        name="relationType"
                        value={values.relationType}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Object Tag"
                        name="objectTag"
                        value={values.objectTag}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        variant="outlined"
                        label="Subject Tag"
                        name="subjectTag"
                        value={values.subjectTag}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Regex Rules"
                        name="regexRules"
                        value={values.regexRules}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Tags"
                        name="tags"
                        value={values.tags}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div className='material-ui-button'>
                        <Controls.Button text="Submit"  type="submit">
                        </Controls.Button>
                    </div>
                </Grid>
            </Grid>
        </Form>
        </>
    )
}
