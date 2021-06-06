import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  Button,
  makeStyles,
  Box,
  Chip,
  IconButton
} from '@material-ui/core';
import banner from '../images/banner.png';
import aNewHope from '../images/a_new_hope.jpg';
import empireStrikesBack from '../images/empire_strikes_back.png';
import returnOfTheJedi from '../images/return_of_the_jedi.jpg';
import thePhantomMenace from '../images/the_phantom_menace.jpg';
import attackOfTheClones from '../images/attack_of_the_clones.jpg';
import revengeOfTheSeth from '../images/revengeOfTheSith.jpg';
import imgPlaceHolder from '../images/placeholder.jpg';
import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import Rating from '@material-ui/lab/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart as heartFill, faVideo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';

const useStyles = makeStyles((theme) => ({
  banner: {
    height: '100%',
    width: '100%',
    backgroundImage: `url(${banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: 'inset 250px 0px 150px -50px #1d1e29, inset -250px 0px 150px -50px #1d1e29',
    [theme.breakpoints.up('xs')]: {
      boxShadow: 'inset 75px 0px 75px -50px #1d1e29, inset -75px 0px 75px -50px #1d1e29'
    },
    [theme.breakpoints.up('sm')]: {
      boxShadow: 'inset 150px 0px 100px -75px #1d1e29, inset -150px 0px 100px -75px #1d1e29'
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
      boxShadow: 'inset 200px 0px 100px -75px #1d1e29, inset -200px 0px 100px -75px #1d1e29'
    },
    [theme.breakpoints.up('lg')]: {
      boxShadow: 'inset 250px 0px 150px -50px #1d1e29, inset -250px 0px 150px -50px #1d1e29'
    }
  },
  movieCard: {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform'),
    transitionDelay: '0s',
    transformOrigin: 'bottom',
    '&:hover': {
      transform: 'scale(1.25)',
      zIndex: 99,
      transitionDelay: '0.5s'
    }
  },
  bannerWrapper: {
    width: '100%',
    height: '20vw',
    minHeight: '150px',
    maxHeight: '300px',
    display: 'flex',
    justifyContent: 'center'
  },
  media: {
    height: '10vw',
    minHeight: '80px',
    maxHeight: '160px'
  },
  section: {
    display: 'flex',
    marginTop: '50px',
    '& p': {
      color: '#D8F05E'
    }
  },
  moviesWrapper: {
    maxWidth: '1850px'
  },
  modal: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto'
  },
  paper: {
    backgroundColor: '#1d1e29',
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    width: '50vw',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 0
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '600px'
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '900px'
    }
  },
  modalImg: {
    height: '506px',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'inset 0px -150px 80px -25px #1d1e29',
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      height: '240px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '337px'
    }
  },
  movieData: {
    padding: theme.spacing(0, 7, 4, 7),
    position: 'relative',
    marginTop: -45,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
    }
  },
  movieDataSubtitle: {
    display: 'flex',
    '& p': {
      color: 'grey'
    }
  },
  synopsis: {
    color: 'grey'
  },
  movieTitle: {
    marginBottom: 10
  },
  movieButton: {
    borderColor: '#AFD661',
    color: '#AFD661'
  },
  movieActionArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 30
  },
  movieTags: {
    display: 'flex',
    gap: 15,
    marginBottom: 20,
    alignItems: 'center',
    '& button': {
      color: '#AFD661'
    }
  },
  playButton: {
    fontSize: '1.25rem',
    position: 'absolute',
    bottom: 75,
    left: 60,
    [theme.breakpoints.down('sm')]: {
      bottom: 25
    }
  },
  closeModal: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: 'white',
    fontSize: '2rem'
  },
  movieCharacters: {
    backgroundColor: '#292B3A',
    padding: theme.spacing(4, 7, 4, 7)
  },
  characterCard: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderColor: '#757968',
    border: '1px solid',
    padding: theme.spacing(1, 1, 1, 1)
  }
}));

const movieBanners = new Map([
  [1, thePhantomMenace],
  [2, attackOfTheClones],
  [3, revengeOfTheSeth],
  [4, aNewHope],
  [5, empireStrikesBack],
  [6, returnOfTheJedi]
]);

const moviePlaceHolder = [
  { id: 1, title: 'Untitled' },
  { id: 2, title: 'Untitled' },
  { id: 3, title: 'Untitled' },
  { id: 4, title: 'Untitled' },
  { id: 5, title: 'Untitled' },
  { id: 6, title: 'Untitled' },
  { id: 7, title: 'Untitled' },
  { id: 8, title: 'Untitled' },
  { id: 9, title: 'Untitled' },
  { id: 10, title: 'Untitled' },
  { id: 11, title: 'Untitled' },
  { id: 12, title: 'Untitled' }
];

function Movies () {
  const classes = useStyles();

  const [state, setState] = useState({
    movies: [],
    loading: false
  });

  useEffect(() => {
    axios.get('https://swapi.dev/api/films/')
      .then(({ data: { results } }) => {
        setState({ movies: results, loading: false });
      });
  }, []);

  return (
    <Container maxWidth="xl" className={classes.moviesWrapper}>
      <div className={classes.bannerWrapper}>
        <div className={classes.banner}/>
      </div>

      <MovieCategory title={'Featured'} subTitle={'Movies'} moviesList={state.movies}/>
      <MovieCategory title={'Watchn'} subTitle={'Originals'} moviesList={moviePlaceHolder} placeHolder/>
      <MovieCategory title={'Reality'} subTitle={'TV'} moviesList={moviePlaceHolder} placeHolder/>
    </Container>
  );
}

const Fade = React.forwardRef(function Fade (props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

function MovieCategory (props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [movieData, setMovieData] = useState({
    img: '',
    title: '',
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '',
    characters: []
  });

  const handleOpen = (movie) => {
    axios.all(movie.characters.map(data => axios.get(data.replace('http', 'https'))))
      .then(axios.spread(function (...res) {
        setMovieData({
          img: movieBanners.get(movie.episode_id),
          title: movie.title,
          opening_crawl: movie.opening_crawl,
          director: movie.director,
          producer: movie.producer,
          release_date: movie.release_date,
          characters: res
        });
      }));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (props.placeHolder) {
    return (
      <>
        <Typography variant={'h5'} style={{ marginBottom: '10px' }} className={classes.section}>
          <p>{props.title}</p>&nbsp;{props.subTitle}
        </Typography>


        <Grid container spacing={1}>
          {props.moviesList.map(movie => (
            <Grid key={movie.id} item xs={6} sm={4} md={3} lg={2} className={classes.movieCard}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    alt={movie.title}
                    title={movie.title}
                    image={imgPlaceHolder}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Typography variant={'h5'} style={{ marginBottom: '10px' }} className={classes.section}>
        <p>{props.title}</p>&nbsp;{props.subTitle}
      </Typography>


      <Grid container spacing={1}>
        {props.moviesList.map(movie => (
          <Grid key={movie.episode_id} item xs={6} sm={4} md={3} lg={2} className={classes.movieCard}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  alt={movie.title}
                  title={movie.title}
                  image={movieBanners.get(movie.episode_id)}
                  onClick={() => handleOpen(movie)}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className={classes.modalWrapper}>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          // closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500
          // }}
        >
          <Fade in={open}>
            <MovieDescription data={movieData} function={handleClose}/>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

function MovieDescription (props) {
  const classes = useStyles();

  const [value, setValue] = useState(4);
  const [likeMovie, setLikeMovie] = useState(false);

  function handleLike () {
    setLikeMovie(!likeMovie);
  }

  return (
    <div className={classes.paper}>
      <div style={{ position: 'relative' }}>
        <div className={classes.modalImg} style={{ backgroundImage: `url(${props.data.img})` }}/>
        <Button className={classes.playButton} variant={'contained'}>
          <FontAwesomeIcon icon={faPlay}/>
          &nbsp;PLAY MOVIE
        </Button>
        <IconButton onClick={props.function} className={classes.closeModal}><FontAwesomeIcon
          icon={faTimes}/></IconButton>
      </div>

      <div className={classes.movieData}>
        <Typography variant={'h3'} className={classes.movieTitle}>
          {props.data.title}
        </Typography>

        <div className={classes.movieTags}>
          <IconButton onClick={handleLike}><FontAwesomeIcon icon={likeMovie ? heartFill : heartOutline}/></IconButton>
          <Chip variant="outlined" style={{ borderColor: '#757968', color: '#757968' }} label={'Action'}/>
          <Chip variant="outlined" style={{ borderColor: '#757968', color: '#757968' }} label={'Adventure'}/>
          <Chip variant="outlined" style={{ borderColor: '#757968', color: '#757968' }} label={'Fantasy'}/>
        </div>

        <Typography variant={'subtitle2'} className={classes.movieDataSubtitle}>
          Release date:&nbsp;<p>{props.data.release_date}</p>
        </Typography>
        <Typography variant={'subtitle2'} className={classes.movieDataSubtitle}>
          Language:&nbsp;<p>English</p>
        </Typography>
        <Typography variant={'subtitle2'} className={classes.movieDataSubtitle}>
          Director:&nbsp;<p>{props.data.director}</p>
        </Typography>
        <Typography variant={'subtitle2'} className={classes.movieDataSubtitle}>
          Producer:&nbsp;<p>{props.data.producer}</p>
        </Typography>
        <br/>
        <Typography variant={'subtitle2'}>
          Synopsis:
        </Typography>
        <Typography variant={'body1'} className={classes.synopsis}>
          {props.data.opening_crawl}
        </Typography>

        <Box component={'div'} mt={3} className={classes.movieActionArea}>
          <Button className={classes.movieButton} variant={'outlined'}>
            <FontAwesomeIcon icon={faVideo}/>
            &nbsp;PLAY TRAILER
          </Button>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>

      <MovieCharacters data={props.data.characters}/>
    </div>
  );
}

function MovieCharacters (props) {
  const classes = useStyles();

  return (
    <Box component={'section'} className={classes.movieCharacters}>
      <Typography variant={'h6'}>
        Characters
      </Typography>
      <br/>
      <Grid container spacing={1}>
        {props.data.map((character, id) => (
          <Grid item key={id}>
            <Card className={classes.characterCard}>
              <p style={{ color: 'white' }}>
                {character.data.name}
              </p>
              <p style={{ textTransform: 'capitalize', color: '#757968' }}>
                {character.data.gender}
              </p>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Movies;
