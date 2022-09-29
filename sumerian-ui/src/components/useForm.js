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
    
    const resetForm = () => {
        setValues(initalValues);
        // setErrors({})
    }

    return {
        values, 
        setValues,
        handleInputChange,
        resetForm
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
    const {children, ...other} = props; 

    return (
        <form className={classes.root} {...other}>
            {props.children}
        </form>
    )
}