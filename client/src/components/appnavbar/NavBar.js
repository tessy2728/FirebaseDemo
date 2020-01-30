import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from '../../images/logo-firebase-cra.svg';
import CustomButton from '../widgets/CustomButton';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignInPage from '../signin/SignIn';
import Home from '../home/Home';
import AuthenticationDoc from '../tutorials/authenticationDoc';
import ReattimeDBDoc from '../tutorials/reattimeDBDoc';
import ChatForm from '../chat/chatForm/chatForm'
import HostingDoc from '../tutorials/hostingDoc';
import { Router,  Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import history from '../../history';
import hostingDoc from '../tutorials/hostingDoc';
import CustomFilter from '../widgets/filter/CustomFilter'
import filtersArray from '../../json/filters.json'
import filterData from '../../json/division.json';
import { AuthContext } from "../../App";
import styles from './NavBarStyles'

const PrimarySearchAppBar = (props) => {
  const navBarState = {
    anchorEl: null,
    commonMenuEl: null,
    mobileMoreAnchorEl: null
  };


  const handleProfileMenuOpen = event => {
    // this.setState({ anchorEl: event.currentTarget });
  };

  const handleMenuClose = () => {
    // this.setState({ anchorEl: null });
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    const newState = {anchorEl: headerState.anchorEl,
      mobileMoreAnchorEl: event.currentTarget,
      commonMenuEl: headerState.commonMenuEl}
    setHeaderState(newState);
  };

  const handleMobileMenuClose = () => {
    const newState = {anchorEl: headerState.anchorEl,
      mobileMoreAnchorEl: null,
      commonMenuEl: headerState.commonMenuEl}
    setHeaderState(newState);
  };

  const handleCommonMenuOpen = event => {
    const newState = {anchorEl: headerState.anchorEl,
      commonMenuEl: event.currentTarget,
      mobileMoreAnchorEl: headerState.mobileMoreAnchorEl}
    setHeaderState(newState);
  }

  const handleCommonMenuClose = () => {
    const newState = {anchorEl: headerState.anchorEl,
      commonMenuEl: null,
      mobileMoreAnchorEl: headerState.mobileMoreAnchorEl}
    setHeaderState(newState);
  };

  const openChatBox = () => {
    history.push(ROUTES.CHAT_BOX);
  }

  const { state } = React.useContext(AuthContext);
  const [headerState, setHeaderState] = React.useState(navBarState);
  const { anchorEl, mobileMoreAnchorEl, commonMenuEl} = headerState;
  const { classes } = props;
  let isMenuOpen = Boolean(anchorEl);
  let isCommonMenuOpen = Boolean(commonMenuEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderLoggedInMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    const renderCommonMenu = (
    <Menu
      id="tutorials-menu"
      anchorEl={commonMenuEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isCommonMenuOpen}
    >
      <MenuItem onClick={handleCommonMenuClose} component={Link} to={ROUTES.AUTHENTICATION_DOC}>Authentication</MenuItem>
      <MenuItem onClick={handleCommonMenuClose} component={Link} to={ROUTES.REALTIMEDB_DOC}>Realtime DB</MenuItem>
      <MenuItem onClick={handleCommonMenuClose} component={Link} to={ROUTES.HOSTING_DOC}>Hosting</MenuItem>
    </Menu>)

    let headerIcons;
    if (state.isAuthenticated) {
      headerIcons = (<div className={classes.sectionDesktop}>
          <CustomFilter name={filtersArray.division.name} config={filtersArray.division.config}/>
          <CustomFilter name={filtersArray.affiliate.name} config={filtersArray.affiliate.config}/>
          <CustomFilter name={filtersArray.org.name} config={filtersArray.org.config}/>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>);
    } else {
      headerIcons = (
        <div className={classes.sectionDesktop}>
        <Button aria-haspopup="true" aria-controls="tutorials-menu" onClick={handleCommonMenuOpen} color="inherit">Tutorials</Button>
        <Button onClick={openChatBox} color="inherit">Chat</Button>
        <Link to={ROUTES.SIGN_IN}><CustomButton config={{title:"Login", styles: {}}}>
        </CustomButton></Link>
        </div>)
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" className="App-header">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Link to={ROUTES.LANDING}><img src={logo} className="App-logo" alt="logo" /></Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            
            <div className={classes.grow} />
            
            {headerIcons}
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
        
          </Toolbar>
        </AppBar>
        {renderLoggedInMenu}
        {renderCommonMenu}
        {renderMobileMenu}

        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.CHAT_BOX} component={ChatForm} />    
        <Route path={ROUTES.AUTHENTICATION_DOC} component={AuthenticationDoc} />
        <Route path={ROUTES.REALTIMEDB_DOC} component={ReattimeDBDoc} />    
        <Route path={ROUTES.HOSTING_DOC} component={HostingDoc} />
        <Route path={ROUTES.HOME+'/:username'} component={Home} />
      </div>
    );
  // }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
