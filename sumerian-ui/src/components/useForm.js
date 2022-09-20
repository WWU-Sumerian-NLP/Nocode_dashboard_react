import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles';

export function useForm(initalValues) {
    const [values, setValues] = useState(initalValues)

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values, 
        setValues,
        handleInputChange
    }
}

const useStyle = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: '8px',
        }
    }
})

export function Form(props){
    const classes = useStyle();
    return (
        <form className={classes.root}>
            {props.children}
        </form>
    )
}