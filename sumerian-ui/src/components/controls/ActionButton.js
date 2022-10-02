import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        minWidth: 0,
        margin: "4px"
    },
    secondary: {
        backgroundColor: "#f8324526",
        '& .MuiButton-label': {
            color: "#f83245",
        }
    },
    primary: {
        backgroundColor: "#3c44b126",
        '& .MuiButton-label': {
            color: "#33396",
        }
    },
})

export default function ActionButton(props) {
    const {color, children, onClick} = props; 
    const classes = useStyles();

    return (
        <Button
            className={`{$classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
            </Button>
    )
}