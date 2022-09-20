import React from 'react'
import PageHeader from '../../components/PageHeader'
import EntitiesForm from './EntitiesForm'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CSVData from '../../components/UploadCSV';
import useTable from '../../components/useTable';
import { TableBody } from '@mui/material';
const useStyles = makeStyles({
    pageContent: {
        margin: '40px',
        padding: '24px'
    }
})

export default function Entities() {
    const classes = useStyles();
   
   const {TblContainer} = useTable();

    return(
        <>    
        <PageHeader
        title="New Entity"
        icon={<PeopleOutlineIcon fontSize='large'/>}/>
        <CSVData/>
        <Paper className={classes.pageContent}>
            <TblContainer>
                <TableBody>
                    {
                        
                    }
                </TableBody>
            </TblContainer>
            {/* <EntitiesForm/> */}
        </Paper>
        </>
    )
}