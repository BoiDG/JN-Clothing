import React, { useEffect, useState } from 'react';
import {CircularProgress, Grid, Typography} from '@material-ui/core';
import Product from './Product/Product';
import { IProductItem } from '../../interfaces';
import { commerce } from '../../lib/commerce';
import { Link, useParams } from 'react-router-dom';
import useStyles from './Product/styles';
// import ReactPaginate from 'react-paginate';

interface IProducts{
    products : IProductItem[];
    onAddToCart : Function;
}



const Products = (productsInterface:IProducts) =>{
    const [products, setProducts] = useState<IProductItem[]>(productsInterface.products);
    const category = useParams().category;
    const styles = useStyles();
    

    return ( products ? (
        <div style={{textAlign:'left',paddingTop:'7em',width:'98%',marginInline:'auto'}}>

        <Typography className={styles.urlText} style={{
          marginTop:'2em',
          textAlign:'left',
          paddingLeft:'5em'
          }} component={Link} to={`/category`}>category</Typography>/
          
        <Grid container justify="center" spacing={1}>
        
            {
                products.filter((product) => (product.categories[0].slug==category)).map((product) => (
                    <Grid style={{marginInline:'auto'}} item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product onAddToCart={productsInterface.onAddToCart} product={product} />
                    </Grid>
                ))
            }
            {/* <Pagination count={10} color="primary" /> */}
            
        </Grid>
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