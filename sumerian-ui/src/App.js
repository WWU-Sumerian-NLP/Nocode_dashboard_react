import { makeStyles } from '@material-ui/styles';
import { CssBaseline, Pagination } from '@mui/material';
import './App.css';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Entities from './pages/Entities/Entities';
import Relations from './pages/RelationPatterns/Relations';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Relationships from './pages/Relationships/Relationships';
import ResponsiveAppBar from './pages/Nav';

const useStyles = makeStyles({
  appMain: {
    // paddingLeft: '320px',
    paddingLeft: "32px",
    width: '100%'
  }
})


function App() {

  const classes = useStyles();

  return (
    <>
    {/* <SideMenu/> */}
    <ResponsiveAppBar/>
    {/* <Header/> */}

      <div className={classes.appMain}>
          <Routes>
            <Route path="/" element={<Entities/>}/>
            <Route path="entities" element={<Entities/>}/>
            <Route path="relations" element={<Relations/>}/>
            <Route path="relationships" element={<Relationships/>}/>
          </Routes>
      </div>
    <CssBaseline/>

    </>
  );
}

export default App;
