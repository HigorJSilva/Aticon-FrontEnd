import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom'

import AtividadesIcon from '@material-ui/icons/Assessment';
import EventosIcon from '@material-ui/icons/CalendarToday'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';

import {authenticationService} from '../services/authenticationService';
import { CssBaseline } from '@material-ui/core';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
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

class Drawer extends React.Component {
	state = { 
		anchorEl: null,
		mobileMoreAnchorEl: null 
	};
	

	render() {
		
		const { classes } = this.props;
		// const [anchorEl, setAnchorEl] = React.useState(null);
		// const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

		const isMenuOpen = Boolean(this.state.anchorEl);
		const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

		const handleProfileMenuOpen = event => {
			// setAnchorEl(event.currentTarget);
			this.setState({achorEl: event.currentTarget});
		};

		const handleMobileMenuClose = () => {
			this.setState({mobileMoreAnchorEl: null})
		};

		const handleMenuClose = () => {
			this.setState({achorEl: null});
			handleMobileMenuClose();
		};

		const logout = () =>{
			authenticationService.logout();
			handleMenuClose()
		}

		const handleMobileMenuOpen = event => {
			// setMobileMoreAnchorEl(event.currentTarget);
			this.setState({mobileMoreAnchorEl: event.currentTarget})
		};

		const menuId = 'primary-search-account-menu';
		const renderMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={menuId}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		);

		const mobileMenuId = 'primary-search-account-menu-mobile';
		const renderMobileMenu = (
			<Menu
				anchorEl={this.state.mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}
			>
		{/* {console.log("is admin: "+this.props.isAdmin)} */}
			</Menu>
		);

		return (
			<div className={classes.grow}>
				<CssBaseline/>
			<AppBar position="static">
				<Toolbar>
				<Typography className={classes.title} variant="h6" noWrap>
					Aticon
				</Typography>
				<div className={classes.grow} />
				<div className={classes.sectionDesktop}>
				<IconButton aria-label="show 4 new mails" color="inherit">
					
						<AtividadesIcon />
					</IconButton>

					<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<EventosIcon />
					</Badge>
					</IconButton>


					<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
					</IconButton>
					<IconButton
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
					>
					<AccountCircle />
					</IconButton>
				</div>
				<div className={classes.sectionMobile}>
					<IconButton
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
					>
					<MoreIcon />
					</IconButton>
				</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			</div>
		);
	}
}export default withStyles(styles)(Drawer)