import {React, useEffect, useState} from 'react'
import PageHeader from '../../components/PageHeader'
import RelationsForm from './RelationsForm'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { InputAdornment, Paper, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useTable from '../../components/useTable';
import { TableBody } from '@mui/material';
import * as relationService from "../../service/relationService";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from '../../components/ConfirmDialogue';
import { Search } from "@material-ui/icons";
import Controls from '../../components/controls/Controls';
import RunRelationExtraction from '../../components/api/relations/RunRelationExtraction';
import UploadRelations from '../../components/api/relations/UploadRelations';
import axios from 'axios';

const useStyles = makeStyles({
    pageContent: {
        margin: '40px',
        // padding: '24px'
    },

    searchInput: {
        width: '100%'
    },
    newButton: {
        position: 'absolute',
        right: '24px',
    },
})

const headCells = [
    {id: 'relationType', label: "Relation Type"},
    {id: "subjectTag", label: "Subject Tag"},
    {id: "objectTag", label: "Object Tag"},
    {id: "regexRules", label: "Regex Rules"},
    {id: "tags", label: "Tags"}
]

export default function Relations() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
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
                    return items.filter(x => x.relationType.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const addOrEdit = (relation, resetForm) => {
        if(relation.id === 0){
            relationService.insertRelation(relation)
        } else {
            relationService.updateRelation(relation)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(relationService.getAllRelation())
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
        relationService.deleteRelation(id);
        // deleteRelation(id);
        fetchRelations();
        setNotify({
            isOpen: true,
            message: 'Deleted Succesfully',
            type: 'error'
        })

    }

    const fetchRelations = async () => {
        axios.post("http://localhost:8000/getRelations")
        .then(response => {
            setRecords(response["data"])
        })
    }

    //TODO impelement
    const deleteRelation = async (id) => {
        axios.post("http://localhost:8000/deleteRelation/id")
    }

  
    useEffect(() => {
        fetchRelations();
    }, [])

    return(
        <>  
        <RunRelationExtraction/>
        <UploadRelations/>

        <PageHeader
        title="New Relation"
        subTitle="View and upload relation data"
        icon={<PeopleOutlineIcon fontSize='large'/>}/>
        

        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Input
                    variant="outlined"
                    label="Search Relations"
                    name={classes.searchInput}
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
                            <TableCell>{item.relationType}</TableCell>
                            <TableCell>{item.subjectTag}</TableCell>
                            <TableCell>{item.objectTag}</TableCell>
                            <TableCell>{item.regexRules}</TableCell>
                            <TableCell>{item.tags}</TableCell>
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
            <RelationsForm
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