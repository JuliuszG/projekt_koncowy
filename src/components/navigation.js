import React, { useState, useContext } from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import {AuthContext} from '../context/context';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    paper: {
      backgroundColor: "#17a2b8",
      color: "white",
      width: 250
    }
}

const Navigation = (props) => {
    const [open, setopen] = useState(false);
    const {user, logOut} = useContext(AuthContext);
    const toggleDrawer = () => {
        setopen(true);
    }
    const { classes } = props;
    const btnStyles = {
        outline: "none",
        border: "none",
        background: "none",
        cursor: "pointer",
        color: "#fff",
        position: "absolute",
        left: 10,
        top: 10,
        zIndex: 999
    }
    return (
        <>
            <button onClick={toggleDrawer} style={btnStyles}> <MenuIcon fontSize={"large"}/></button>
            <Drawer classes={{ paper: classes.paper }} color="primary" anchor={"left"} open={open} onClose={() => setopen(false)}>
                <List>

                    <ListSubheader>Witaj, {user.email}</ListSubheader>

                    <Divider style={{marginBottom: 20}}/>

                    <ListItem button component={Link} to={"/"}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Strona główna" />
                    </ListItem>

                    <ListItem button component={Link} to={"/search"}>
                    <ListItemIcon>
                        <LocalMoviesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Szukaj filmów" />
                    </ListItem>

                    <ListItem button component={Link} to={"/search-review"}>
                    <ListItemIcon>
                        <ThumbsUpDownIcon />
                    </ListItemIcon>
                    <ListItemText primary="Szukaj recenzji" />
                    </ListItem>

                    <Divider style={{margin: "20px 0"}}/>

                    <ListItem button onClick={e => logOut(e)}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wyloguj" />
                    </ListItem>

                </List>
            </Drawer>
        </>
    )
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired
  };

  
export default withStyles(styles)(Navigation);;