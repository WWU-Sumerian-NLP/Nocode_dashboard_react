import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@mui/material';
import './App.css';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import SideMenu from './components/SideMenu';
import CSVData from './components/UploadCSV';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Entities from './pages/Entities/Entities';

// const theme = createMuiTheme({

// })

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <>
    <SideMenu/>
    
    <div className={classes.appMain}>
      <Header/>
      {/* <Form/> */}
      <Entities/>
    </div>
    <CssBaseline/>
    </>
  );
}

export default App;
