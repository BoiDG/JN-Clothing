import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu,Button, Typography, alpha,InputLabel, Input, Grid } from '@material-ui/core'
import useStyles from './styles';
import { IProductItem } from '../../interfaces'


interface IHome{
    products : IProductItem[];
}

function Home(homeInterface:IHome) {
  const styles = useStyles();


  return (
    <div style={{paddingTop: '100px',display:'flex',justifyContent:'center'}}>
      <div style={{backgroundColor: 'rgba(0,140,0)',}}>
        <img className={styles.image} />
        <h1>
        awawdada
        </h1>
          
      </div>
      <div style={{backgroundColor: 'rgba(100,140,0)',}}>
        
      </div>
    </div>
  )
}

export default Home