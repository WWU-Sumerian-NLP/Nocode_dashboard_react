import React from 'react'
import {Button as MuiButton} from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        margin: "4px"
    },
    label: {
        textTransform: 'none'
    }
})

export default function Button(props) {
    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return(
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}