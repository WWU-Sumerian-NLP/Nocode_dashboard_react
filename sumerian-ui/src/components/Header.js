import { AppBar, Badge, IconButton, InputBase, Toolbar } from '@material-ui/core';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles, useTheme} from '@material-ui/styles';
import { fontSize } from '@mui/system';


const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff'
    },

    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: 'f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        },
    }
})

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static" class={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <InputBase
                            placeholder="Search"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}

                        />
                    </Grid>

                    <Grid item sm>
                    </Grid>

                    <Grid item>
                        <IconButton>
                            <Badge color="secondary">
                                <SettingsIcon fontSize='small' />
                            </Badge>
                        </IconButton>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}

// Weird bug, needing to use class instead of className in AppBar
// Reference: https://stackoverflow.com/questions/70798870/why-am-i-unable-to-override-material-ui-styles-using-makestyle