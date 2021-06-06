import React from 'react';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles(() => ({
  footer: {
    marginTop: 80,
    fontSize: '0.8rem',
    color: 'gray'
  },
  social: {
    fontSize: '2rem',
    display: 'flex',
    gap: '20px',
    marginBottom: 20
  },
  footerLink: {
    display: 'flex'
  },
  legal: {
    padding: '20px 0'
  }
}));

function Footer () {
  const classes = useStyles();

  return (
    <Box component={'footer'} mt={5}>
      <Container className={classes.footer}>
        <div className={classes.social}>
          <FontAwesomeIcon icon={faInstagram}/>
          <FontAwesomeIcon icon={faFacebook}/>
          <FontAwesomeIcon icon={faTwitter}/>
        </div>
        <div className={classes.footerLink}>
          <Grid
            container
            direction={'column'}
            spacing={3}
          >
            <Grid item>Audio y subtítulos</Grid>
            <Grid item>Prensa</Grid>
            <Grid item>Privacidad</Grid>
            <Grid item>Contáctano</Grid>
          </Grid>

          <Grid
            container
            direction={'column'}
            spacing={3}
          >
            <Grid item>Centro de ayuda</Grid>
            <Grid item>Empleo</Grid>
            <Grid item>Preferencias</Grid>
          </Grid>

          <Grid
            container
            direction={'column'}
            spacing={3}
          >
            <Grid item>Términos de uso</Grid>
            <Grid item>Información de la emprea</Grid>
            <Grid item>Avisos legales</Grid>
          </Grid>
        </div>

        <Typography variant={'subtitle1'} className={classes.legal}>
          @2018 - 2021 Watchn, Inc. o sus filiales
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
