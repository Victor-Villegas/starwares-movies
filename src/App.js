import './App.css';
import {
  Box,
  makeStyles
} from '@material-ui/core';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import pattern from './images/pattern.png';
import Footer from './components/Footer';

const useStyles = makeStyles(() => ({
  app: {
    margin: 0,
    fontFamily: ['Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#1d1e29',
    backgroundImage: `url(${pattern})`
  }
}));

function App () {
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <NavBar/>
      <Movies/>
      <Footer/>
    </Box>
  );
}

export default App;
