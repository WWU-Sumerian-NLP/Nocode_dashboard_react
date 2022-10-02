import {React, useEffect, useState} from 'react'
import PageHeader from '../../components/PageHeader'
import RelationshipForms from './RelationshipForm'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { InputAdornment, Paper, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useTable from '../../components/useTable';
import { TableBody } from '@mui/material';
import * as relationshipService from "../../service/relationshipService";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from '../../components/ConfirmDialogue';
import { Search } from "@material-ui/icons";
import Controls from '../../components/controls/Controls';
import UploadRelationship from '../../components/api/relationship/UploadRelationships';
import RunBuildRelationshipGraph from '../../components/api/relationship/RunBuildRelationshipGraph';
import RunPipeline from '../../components/api/relationship/RunPipeline';
import axios from 'axios';

const useStyles = makeStyles({
    pageContent: {
        margin: '40px',
        padding: '24px'
    },

    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '-180px',
    },
})

const headCells = [
    {id: 'tabletNum', label: "Tablet Num"},
    {id: "relationType", label: "Relation Type"},
    {id: "subject", label: "Subject"},
    {id: "object", label: "Object"},
    {id: "providence", label: "Providence"},
    {id: "period", label: "Period"},
    {id: "datesReferenced", label: "DatesReferenced"},

]

export default function Relationships() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(relationshipService.getAllRelationship())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value === "") {
                    return items;
                } else {
                    return items.filter(x => x.tabletNum.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const addOrEdit = (relationship, resetForm) => {
        if(relationship.id === 0){
            relationshipService.insertRelationship(relationship)
        } else {
            relationshipService.updateRelationship(relationship)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(relationshipService.getAllRelationship())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        console.log("deleting");
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        relationshipService.deleteRelationship(id);
        setRecords(relationshipService.getAllRelationship());
        setNotify({
            isOpen: true,
            message: 'Deleted Succesfully',
            type: 'error'
        })
    }

    const fetchRelationships = async () => {
        axios.post("http://localhost:8000/GetRelationships")
        .then(response => {
            setRecords(response["data"])
        })
    }
    useEffect(() => {
        fetchRelationships();
    }, [])

    return(
        <>    
        <RunPipeline/>
        <UploadRelationship/>

        <PageHeader
        title="New Relationships"
        subTitle="View and upload neo4j relationship data"
        icon={<PeopleOutlineIcon fontSize='large'/>}/>
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Input
                    variant="outlined"
                    label="Search Neo4j Relationships"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search/>
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Controls.Button
                    text="add new"
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    className={classes.newButton}
                    onClick={ () => {setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {
                     recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.tabletNum}</TableCell>
                            <TableCell>{item.relationType}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.object}</TableCell>
                            <TableCell>{item.providence}</TableCell>
                            <TableCell>{item.period}</TableCell>
                            <TableCell>{item.datesReferenced}</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                    onClick={() => {openInPopup(item) }}>
                                   <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>

                                <Controls.ActionButton
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => { onDelete(item.id) }
                                        })
                                    }}>
                                    <CloseIcon fontSize="small"/>
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>))   
                    }
                </TableBody>
            </TblContainer>
            <TblPagination/>
        </Paper>
        <Popup
            title="Relations Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
        >
            <RelationshipForms
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
            />
        </Popup>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />

        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
        </>
    )
}


