import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem,Menu,Button, Typography, alpha } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
import { ICategory } from '../../interfaces';


interface INavbarItem{
  cartCount:number | any;
  categories:ICategory[];
}

function Narvbar(navbarData:INavbarItem) {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <>
        <AppBar position="fixed" color="inherit" className = {styles.appBar}>
            <Toolbar>
                <Typography component={Link} to="/" className = {styles.title} variant="h6" color="inherit">
                    JNB Clothing
                </Typography>
                
                <div style={{flexGrow: 1,display:'flex',justifyContent:'flexStart',marginLeft:'2em'}}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Products
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem component={Link} to="/category">All</MenuItem>
                    {navbarData.categories.map((category)=>(
                      <MenuItem component={Link} to={`/${category.slug}/product`} >{category.name}</MenuItem>
                    ))}
                  </Menu>
                </div>
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