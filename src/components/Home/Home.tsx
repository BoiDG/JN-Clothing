import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu,Button, Typography, alpha,InputLabel, Input, Grid, Box, Container, CardMedia,
  List, ListItem, ListItemText  } from '@material-ui/core'
import useStyles from './styles';
import { IProductItem } from '../../interfaces'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

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
      </Grid>
 
      <div className={styles.container}>
      <div className={styles.orangeBar}/>
      <div className={styles.containerHeader}>Collections</div>
      
        <div className={styles.containerBox}>
          <div className={styles.containerItm} ><img src={cloth1}/></div>
          <div className={styles.containerItm}><img src={cloth1}/></div>
          <div className={styles.containerItm}><img src={cloth1}/></div>
        </div>
        <Typography className={styles.containerMoreBtn} component={Link} to={`/newArrival/product`}>see more</Typography>
      </div>

      <div className={styles.secondBanner}/>

      
    </div>
    
  )
}

export default Home

