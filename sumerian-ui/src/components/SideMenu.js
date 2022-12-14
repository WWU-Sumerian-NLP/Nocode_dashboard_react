import { makeStyles } from '@material-ui/styles';
import React from 'react'


// withStyles & makeStyles

const useStyles = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '200%',
        backgroundColor: '#253053'
    }
})

export default function SideMenu() {
    const classes = useStyles();
    return (
        <div className={classes.sideMenu}>

        </div>
    )
}