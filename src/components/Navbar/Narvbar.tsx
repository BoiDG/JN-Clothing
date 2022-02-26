import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu, Typography, alpha } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';


interface INavbarItem{
  cartCount:number | any;
}

function Narvbar(navbarData:INavbarItem) {
  const drawerWidth = 0;
  const styles = useStyles();
  
  return (
    
    <>
        <AppBar position="fixed" color="inherit" className = {styles.appBar}>
            <Toolbar>
                <Typography className = {styles.title} variant="h6" color="inherit">
                    JNB Clothing
                </Typography>
                <div className={styles.grow}></div>
                <div className={styles.menuButton}></div>
                <IconButton aira-label="">
                  <Badge badgeContent={navbarData.cartCount} color="secondary"> </Badge>
                  <ShoppingCart />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Narvbar