import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@material-ui/core'
import Controls from "./controls/Controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    dialog: {
        padding: "16px",
        position: 'absolute',
        top: "40px"
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        // backgroundColor: theme.palette.secondary.light,
        // color: theme.palette.secondary.main,
        '&:hover': {
            // backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
})

export default function ConfirmDialog(props) {
    console.log("Confirm Dialog")

    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} 
                >No</Controls.Button>
                <Controls.Button
                    text="Yes"
                    onClick={confirmDialog.onConfirm}
                >Yes</Controls.Button>
            </DialogActions>
        </Dialog>
    )
}