import {React, useEffect, useState} from 'react'
import PageHeader from '../../components/PageHeader'
import EntitiesForm from './EntitiesForm'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { InputAdornment, Paper, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useTable from '../../components/useTable';
import { TableBody } from '@mui/material';
import * as entityService from "../../service/entitiesService";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from '../../components/ConfirmDialogue';
import { Search } from "@material-ui/icons";
import Controls from '../../components/controls/Controls';
import RunEntityExtraction from '../../components/api/entity/RunEntityExtraction';
import UploadEntities from '../../components/api/entity/UploadEntities';
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
    }
})

const headCells = [
    {id: 'entityName', label: "Entity Name"},
    {id: "entityTag", label: "Entity Tag"}
]

export default function Entities() {
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
                    return items.filter(x => x.entityName.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const addOrEdit = (entity, resetForm) => {
        console.log("in entity.js", entity)
        if(entity.id === 0){
            entityService.insertEntity(entity)
        } else {
            entityService.updateEntity(entity)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(entityService.getAllEntity())
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
        entityService.deleteEntity(id);
        setRecords(entityService.getAllEntity());
        setNotify({
            isOpen: true,
            message: 'Deleted Succesfully',
            type: 'error'
        })
    }
    const fetchEntities = async () => {
        axios.post("http://localhost:8000/getEntities")
        .then(response => {
            setRecords(response["data"])
        })
    }

    useEffect(() => {
        fetchEntities();
    }, [])

    return(
        <>    
        <UploadEntities/>
        <RunEntityExtraction/>
        <PageHeader
        title="New Entity"
        subTitle="View and upload entity data"
        icon={<PeopleOutlineIcon fontSize='large'/>}/>
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Input
                    variant="outlined"
                    label="Search Entities"
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
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
            </Toolbar>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {
                     recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.entityName}</TableCell>
                            <TableCell>{item.entityTag}</TableCell>
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
            title="Entities Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
        >
            <EntitiesForm
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