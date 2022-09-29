import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        minWidth: 0,
        margin: "4px"
    },
    // secondary: {
    //     backgroundColor: theme.palette.secondary.light,
    //     '& .MuiButton-label': {
    //         color: theme.palette.secondary.main,
    //     }
    // },
    // primary: {
    //     backgroundColor: theme.palette.primary.light,
    //     '& .MuiButton-label': {
    //         color: theme.palette.primary.main,
    //     }
    // },
})

export default function ActionButton(props) {
    const {color, children, onClick} = props; 
    const classes = useStyles();

    return (
        <Button
            className={classes.root}
            onClick={onClick}>
            {children}
            </Button>
    )
}