import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu,Button, Typography, alpha,InputLabel, Input, Grid, Box, Container } from '@material-ui/core'
import useStyles from './styles';
import { IProductItem } from '../../interfaces'
import ReactPlayer from 'react-player';
import asset from './../asset/BG2.gif';
import img from './../meme-unravel.jpg';
import cloth1 from './../asset/JNBHoodie.png';
import secondBanner from './../asset/adam&god.jpg';


interface IHome{
    products : IProductItem[];
}

function Home(homeInterface:IHome) {
  const styles = useStyles();


  return (
    <div className="content" style={{}}>
      <Grid className={styles.banner} >
        <img src={asset} className={styles.bannerImg}/>

        {/* <Grid>
        <Button className={styles.bannerBtn} aria-label="Shop Now" variant="contained">
          <Typography style={{fontSize:'1.5rem'}}>
          Shop Now
        </Typography> 
        </Button>
        </Grid> */}
      </Grid>

      <Container maxWidth="lg" className={styles.container}>
      <div>collections</div>
        <div className={styles.containerBox}>
          <div className={styles.containerItm}><img src={cloth1}/></div>
          <div className={styles.containerItm}><img src={cloth1}/></div>
          <div className={styles.containerItm}><img src={cloth1}/></div>
        </div>
      </Container>
      <Container maxWidth="lg" className={styles.container}> banner
        <div className={styles.secondBanner}>
          {/* <img src={secondBanner}/> */}
        </div>
      </Container>
      
      
      

      




      {/* <div style={{backgroundColor:'blue'}}> adwada */}
      {/* <Grid className="button" item xs={6} sm={6}  style={{display:'flex',justifyContent:'flex-start'}}>
        <Button style={{
            borderRadius: 2,
            backgroundColor: "transparent",
            paddingInline:'3em',
            color:'white',
            width:'80%',
            display: 'flex',
            justifyContent:'center',
            border: "5px solid white",
            marginTop:'1em'
        }} aria-label="Shop Now" variant="contained">
          <Typography variant="subtitle1" style={{fontSize:'1.5rem'}}>
          Shop Now
        </Typography> 
        </Button>
        </Grid> */}

      {/* </div> */}

    </div>
    
  )
}

export default Home