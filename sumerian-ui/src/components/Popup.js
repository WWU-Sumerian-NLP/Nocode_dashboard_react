import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';
import Controls from './controls/Controls';

const useStyles = makeStyles({
    dialogWrapper: {
        padding: "16px",
        position: 'absolute',
        top: "40px",
    },
    dialogTitle: {
        paddingRight: '0px'
    },
})

export default function Popup(props) {
    
    const { title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex '}} >
                    <Typography variant="h6" component="div" style={{ flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        onClick={()=>{setOpenPopup(false)}}>
                            <CloseIcon/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>

        </Dialog>
    )
}