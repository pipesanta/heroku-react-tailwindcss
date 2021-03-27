import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// import { makeStyles, Drawer, List, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// VIEWS
import SearchListComponent from './search-list/search-list';
import ItemDetailComponent from './search-list/item-detail';

import { Switch, Route, Redirect } from "react-router-dom";

// import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
  list: { width: 250 },
  fullList: { width: 'auto' },
  menuButton: {
    marginRight: "12px",
  },
  title: {
    flexGrow: 1,
  },
});

export default function MainLayout(props) {
  const { location } = props;
  const classes = useStyles();
  const history = useHistory();

  const [drawerState, setDrawerState] = useState({ top: false, left: false, bottom: false, right: false });
  const [ currentUrl, setCurrentUrl ] = useState("");

  useEffect(() => {
    const route = location.pathname;
    setCurrentUrl(route);
  }, [location]);  
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, { [classes.fullList]: anchor === 'top' || anchor === 'bottom' }) }
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"books"} onClick={() => { handleClickOnmenuItem("books")}}>
          <ListItemIcon> <SearchIcon/> </ListItemIcon>
          <ListItemText primary={"Busqueda"} />
        </ListItem>
        <Divider/>
        <ListItem button key={"settings"} onClick={() => { handleClickOnmenuItem("settings") }}>
          <ListItemIcon> <SettingsIcon/> </ListItemIcon>
          <ListItemText primary={"Configuraciones"} />
        </ListItem>
      </List>
    </div>
  );

  const handleClickOnmenuItem= (route) => {
    switch (route) {
      case 'logout':
        history.push("/login");
        break;

      default:
        break;
    }
  }

  const goToCreateNewBook = () => {
    history.push("/main/books/new");
  }

  return (
    <div>
      <React.Fragment key={"left"}>

        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={toggleDrawer("left", true) } className={classes.menuButton}
              color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Merlib
            </Typography>

            <IconButton edge="start" style={{ display: currentUrl.includes("/main/books/") ? 'block': 'none' }}
              onClick={ handleClickOnmenuItem.bind(this, "books") }
              className={classes.menuButton}
              color="inherit" aria-label="menu">
              <SearchIcon />
            </IconButton>

          </Toolbar>
        </AppBar>

        <Drawer anchor={"left"} open={drawerState["left"]} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>

        {/* BODY */}
        <main className="bg-blue-50">
        <Switch>
            <Redirect exact path="/main" to="/main/search"/>
            <Route path="/main/search" exact render={ (props) => <SearchListComponent { ...props } /> } />
            <Route path="/main/search/detail/:id" exact render={ (props) => <ItemDetailComponent { ...props } /> } />
            <Redirect to=""></Redirect>              
          </Switch> 
         
        </main>
        {/* BODY */}

      </React.Fragment>
  
    </div>
  );
}