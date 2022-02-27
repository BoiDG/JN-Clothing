import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu, Typography, alpha } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

interface INavbarItem{
  cartCount:number | any;
}

function Narvbar(navbarData:INavbarItem) {
  const styles = useStyles();
  
  return (
    
    <>
        <AppBar position="fixed" color="inherit" className = {styles.appBar}>
            <Toolbar>
                <Typography component={Link} to="/" className = {styles.title} variant="h6" color="inherit">
                    JNB Clothing
                </Typography>
                <div className={styles.grow}></div>
                <div className={styles.menuButton}></div>
                <IconButton component={Link} to="/cart" aira-label="">
                  <Badge badgeContent={navbarData.cartCount} color="secondary"> </Badge>
                  <ShoppingCart />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Narvbar