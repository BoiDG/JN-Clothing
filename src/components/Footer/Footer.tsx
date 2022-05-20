import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu,Button, Typography, alpha,InputLabel, Input, Grid, Box, Container, CardMedia,
  List, ListItem, ListItemText  } from '@material-ui/core'
import useStyles from './styles';
import { IProductItem } from '../../interfaces'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';






function Footer() {
  const styles = useStyles();


  return (

    <div className={styles.Wrapper}>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.footerTitle}>JNB</div>
                    <div className={styles.footerLinks}>About Us</div>
                    <div className={styles.footerLinks}>Our Services</div>
                    <div className={styles.footerLinks}>Policy</div>
                
            </div>
        

        
            <div className={styles.column}>
                <div className={styles.footerTitle}>Newsletter</div>
                    <div className={styles.footerLinks}>Subscribe to receive updates, exclusive deals and more.</div>
                    <div className={styles.footerLinks}>enter email</div>
                    <div className={styles.footerLinks}>subscribe</div>
                
            </div>
       

        
            <div className={styles.column}>
                <div className={styles.footerTitle}>Get Help</div>
                    <div className={styles.footerLinks}>FAQ</div>
                    <div className={styles.footerLinks}>Shipping</div>
                    <div className={styles.footerLinks}>Returns</div>
                    <div className={styles.footerLinks}>Payment Options</div>
                
            </div>

            <div className={styles.column}>
                <div className={styles.footerTitle}>Follow Us</div>
                    <div className={styles.footerLinks}>Instagram</div>
                    <div className={styles.footerLinks}>Linkined</div>
                    <div className={styles.footerLinks}>FaceBook</div>
                
            </div>
        </div>
        <div className={styles.copyRight}>© JNB</div>
    </div>

  )
}

export default Footer

