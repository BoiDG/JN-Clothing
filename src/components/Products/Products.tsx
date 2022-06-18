import React, { useEffect, useState } from 'react';
import {CircularProgress, Grid, Typography} from '@material-ui/core';
import Product from './Product/Product';
import { IProductItem } from '../../interfaces';
import { commerce } from '../../lib/commerce';
import { Link, useParams } from 'react-router-dom';
import useStyles from './Product/styles';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppPagination from '../../lib/pagination';
// import ReactPaginate from 'react-paginate';

interface IProducts{
    products : IProductItem[];
    onAddToCart : Function;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      marginRight: '2em',
      width: '20em',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Products = (productsInterface:IProducts) =>{
    const [products, setProducts] = useState<IProductItem[]>(productsInterface.products);
    const [showproducts, setShowProducts] = useState<IProductItem[]>(productsInterface.products);
    const [search, setSearch] = useState('')
    const BIN = 5;
    const [curr, setCurr] = useState(1);
    const category = useParams().category;
    const styles = useStyles();

    useEffect(()=>{
      setCurr(1)
    },[category,search]);

    useEffect(()=>{
      const newProd = products.filter((product) => (product.categories[0].slug==category && product.name.toLowerCase().includes(search))).slice(Math.max((curr-1)*BIN,0),Math.min(curr*BIN,products.length));
      console.log(Math.max((curr-1)*BIN,0),Math.min(curr*BIN,products.length))
      console.log(products)
      setShowProducts(newProd)

    },[curr,category,search]);


    return ( products ? (
        <div style={{textAlign:'left',paddingTop:'7em',width:'98%',marginInline:'auto'}}>

        <Typography className={styles.urlText} style={{
          marginTop:'2em',
          textAlign:'left',
          paddingLeft:'5em'
          }} component={Link} to={`/category`}>category</Typography>/
         
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Search>
          <Grid container justify="center" spacing={1}>
        
            {
                showproducts.filter((product) => (product.categories[0].slug==category && product.name.toLowerCase().includes(search))).map((product) => (
                    <Grid style={{marginInline:'auto'}} item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product onAddToCart={productsInterface.onAddToCart} product={product} />
                    </Grid>
                ))
            }
            {/* <Pagination count={10} color="primary" /> */}
            
        </Grid>
        <AppPagination page={Math.ceil(products.filter((product) => (product.categories[0].slug==category && product.name.toLowerCase().includes(search))).length/BIN)} curr={curr} setCurr = {setCurr}/>
       
        </div>) : (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:'8em'
        }}>
      <CircularProgress />
    </div>
  )
    )

}

export default Products;