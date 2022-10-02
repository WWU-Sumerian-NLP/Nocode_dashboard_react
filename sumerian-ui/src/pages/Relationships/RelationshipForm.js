import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls';

const initalValues = {
    id: 0,
    tabletNum: '',
    relationType: '',
    subject: '',
    object: '',
    providence: '',
    period: '',
    datesReferenced: '',

}

export default function RelationshipForms(props){
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
                        label="Tablet Num"
                        name="tabletNum"
                        value={values.tabletNum}
                        onChange={handleInputChange}
                    />
                </Grid>
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
                        label="Subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Object"
                        name="object"
                        value={values.object}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        variant="outlined"
                        label="Providence"
                        name="providence"
                        value={values.providence}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Period"
                        name="period"
                        value={values.period}
                        onChange={handleInputChange}
                    />
                </Grid>                <Grid item xs={6}>
                    <Controls.Input
                        label="Dates Referenced"
                        name="datesReferenced"
                        value={values.datesReferenced}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div className='material-ui-button'>
                        <Controls.Button text="Submit" type="submit">
                        </Controls.Button>
                    </div>
                </Grid>
            </Grid>
        </Form>
        </>
    )
}
