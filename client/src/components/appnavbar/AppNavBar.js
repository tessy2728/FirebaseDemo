import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from '../../images/logo-firebase-cra.svg';
import MyButton from '../widgets/MyButton';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignInPage from '../signin/SignIn';
import Home from '../home/Home';
import AuthenticationDoc from '../tutorials/authenticationDoc';
import ReattimeDBDoc from '../tutorials/reattimeDBDoc';
import HostingDoc from '../tutorials/hostingDoc';
import { Router,  Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import history from '../../history';
import hostingDoc from '../tutorials/hostingDoc';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    commonMenuEl: null,
    mobileMoreAnchorEl: null
  };


  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleCommonMenuOpen = event => {
    this.setState({ commonMenuEl: event.currentTarget });
  }

  handleCommonMenuClose = () => {
    this.setState({ commonMenuEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, commonMenuEl, isLoggedIn} = this.state;
    const { classes } = this.props;
    let isMenuOpen = Boolean(anchorEl);
    let isCommonMenuOpen = Boolean(commonMenuEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
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
      <MenuItem onClick={this.handleCommonMenuClose} component={Link} to={ROUTES.AUTHENTICATION_DOC}>Authentication</MenuItem>
      <MenuItem onClick={this.handleCommonMenuClose} component={Link} to={ROUTES.REALTIMEDB_DOC}>Realtime DB</MenuItem>
      <MenuItem onClick={this.handleCommonMenuClose} component={Link} to={ROUTES.HOSTING_DOC}>Hosting</MenuItem>
    </Menu>)

    let headerIcons;
    if (isLoggedIn) {
      headerIcons = (<div className={classes.sectionDesktop}>
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
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>);
    } else {
      headerIcons = (
        <div className={classes.sectionDesktop}>
        <Button aria-haspopup="true" aria-controls="tutorials-menu" onClick={this.handleCommonMenuOpen} color="inherit">Tutorials</Button>
        <Link to={ROUTES.SIGN_IN}><MyButton variant="contained" color="primary">
        </MyButton></Link>
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
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderCommonMenu}
        {renderMobileMenu}

        <Route path={ROUTES.SIGN_IN} component={() => <SignInPage
              isLoggedIn={this.state.isLoggedIn}
            />} />
            
        <Route path={ROUTES.AUTHENTICATION_DOC} component={AuthenticationDoc} />
        <Route path={ROUTES.REALTIMEDB_DOC} component={ReattimeDBDoc} />    
        <Route path={ROUTES.HOSTING_DOC} component={HostingDoc} />
        <Route path={ROUTES.HOME+'/:username'} component={Home} />
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
