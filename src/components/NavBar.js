import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  makeStyles,
  fade,
  Avatar,
  Typography,
  Box
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: '160px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      maxWidth: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height: '100%',
      color: 'rgba(255,255,255,0.5)',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: 'rgb(255,255,255)'
      }
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      position: 'relative'
    }
  },
  inputRoot: {
    color: 'inherit',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  navBar: {
    backgroundColor: '#292B3A',
    boxShadow: 'none'
  },
  toolBar: {
    position: 'relative',
    height: '10vw',
    maxHeight: '80px',
    minHeight: '50px'
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    width: '160px',
    minWidth: '105px',
    height: '100%',
    minHeight: '50px',
    backgroundPosition: 'left',
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      backgroundSize: 'contain'
    }
  },
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  logoTitle: {
    position: 'absolute',
    bottom: '-3px'
  },
  linkButton: {
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '1rem'
  },
  buttonsWrapper: {
    display: 'none',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: theme.spacing(0, 1),
    alignItems: 'center'
  },
  avatar: {
    height: '5vw',
    width: '5vw',
    maxHeight: '40px',
    minHeight: '30px',
    maxWidth: '40px',
    minWidth: '30px'
  },
  userName: {
    display: 'none',
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  navBox: {
    position: 'relative',
    height: '10vw',
    maxHeight: '80px',
    minHeight: '50px'
  }
}));

function NavBar () {
  const classes = useStyles();

  return (
    <Box className={classes.navBox}>
      <AppBar className={classes.navBar} position={'fixed'}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.logo}/>

          <div className={classes.buttonsWrapper}>
            <Button className={classes.linkButton}>Home</Button>
            <Button className={classes.linkButton}>Movies</Button>
            <Button className={classes.linkButton}>Series</Button>
            <Button className={classes.linkButton}>My Collection ▼</Button>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.userWrapper}>
            <Avatar className={classes.avatar}>V</Avatar>
            <Typography variant={'subtitle1'} className={classes.userName}>Victor</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
